#!/usr/bin/env python3
"""
Test script to reproduce intermittent 401 errors with multiple Gunicorn workers.
This simulates the production environment where authentication fails randomly.
"""

import requests
import time
import concurrent.futures
from typing import List, Dict

BASE_URL = "http://localhost:8000"
LOGIN_URL = f"{BASE_URL}/api/admin/login"
VERIFY_URL = f"{BASE_URL}/api/admin/verify"
PAGES_URL = f"{BASE_URL}/api/pages"

def login() -> str:
    """Login and get token"""
    response = requests.post(LOGIN_URL, json={
        "username": "malo",
        "password": "1234567890"
    })
    if response.status_code == 200:
        data = response.json()
        return data.get("token")
    raise Exception(f"Login failed: {response.status_code}")

def verify_token(token: str) -> bool:
    """Verify token"""
    response = requests.get(VERIFY_URL, params={"token": token})
    if response.status_code == 200:
        return response.json().get("valid", False)
    return False

def get_pages(token: str) -> Dict:
    """Get pages with authentication"""
    response = requests.get(PAGES_URL, params={"token": token})
    return {
        "status_code": response.status_code,
        "success": response.status_code == 200,
        "data": response.json() if response.status_code == 200 else response.text
    }

def test_single_request(iteration: int, token: str) -> Dict:
    """Test a single authenticated request"""
    result = {
        "iteration": iteration,
        "timestamp": time.time(),
        "verify_success": False,
        "pages_success": False,
        "error": None
    }
    
    try:
        # Verify token
        verify_result = verify_token(token)
        result["verify_success"] = verify_result
        
        # Get pages
        pages_result = get_pages(token)
        result["pages_success"] = pages_result["success"]
        result["pages_status"] = pages_result["status_code"]
        
        if not pages_result["success"]:
            result["error"] = f"Pages request failed: {pages_result['status_code']}"
    
    except Exception as e:
        result["error"] = str(e)
    
    return result

def run_concurrent_tests(token: str, num_requests: int = 50, workers: int = 10) -> List[Dict]:
    """Run multiple concurrent requests to detect race conditions"""
    print(f"\n🔄 Running {num_requests} concurrent requests with {workers} workers...")
    
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as executor:
        futures = [
            executor.submit(test_single_request, i, token)
            for i in range(num_requests)
        ]
        
        for future in concurrent.futures.as_completed(futures):
            results.append(future.result())
    
    return results

def analyze_results(results: List[Dict]):
    """Analyze test results and identify issues"""
    total = len(results)
    verify_failures = sum(1 for r in results if not r["verify_success"])
    pages_failures = sum(1 for r in results if not r["pages_success"])
    errors = [r for r in results if r["error"]]
    
    print(f"\n📊 Test Results:")
    print(f"   Total requests: {total}")
    print(f"   Verify failures: {verify_failures} ({verify_failures/total*100:.1f}%)")
    print(f"   Pages failures: {pages_failures} ({pages_failures/total*100:.1f}%)")
    print(f"   Errors: {len(errors)}")
    
    if errors:
        print(f"\n❌ Errors detected:")
        for error in errors[:5]:  # Show first 5 errors
            print(f"   - Iteration {error['iteration']}: {error['error']}")
    
    if verify_failures > 0 or pages_failures > 0:
        print(f"\n⚠️  ISSUE DETECTED: Intermittent authentication failures!")
        print(f"   This indicates a multi-worker race condition.")
        return False
    else:
        print(f"\n✅ All requests successful!")
        return True

def main():
    print("=" * 70)
    print("Multi-Worker Authentication Test")
    print("=" * 70)
    print("\n⚠️  Make sure the backend is running with multiple workers:")
    print("   gunicorn server:app -k uvicorn.workers.UvicornWorker -w 2 -b 0.0.0.0:8000")
    print("\n" + "=" * 70)
    
    try:
        # Step 1: Login
        print("\n1️⃣  Logging in...")
        token = login()
        print(f"   ✅ Login successful! Token: {token[:20]}...")
        
        # Step 2: Verify token works initially
        print("\n2️⃣  Verifying token...")
        if verify_token(token):
            print(f"   ✅ Token verified successfully")
        else:
            print(f"   ❌ Token verification failed")
            return
        
        # Step 3: Run concurrent tests
        print("\n3️⃣  Testing with concurrent requests...")
        results = run_concurrent_tests(token, num_requests=50, workers=10)
        
        # Step 4: Analyze results
        success = analyze_results(results)
        
        # Step 5: Summary
        print("\n" + "=" * 70)
        if success:
            print("✅ PASS: No authentication issues detected")
        else:
            print("❌ FAIL: Authentication issues detected with multiple workers")
            print("\n🔍 Root Cause:")
            print("   The 'active_sessions' dictionary is stored in-memory")
            print("   Each Gunicorn worker has its own Python process")
            print("   Sessions created in Worker 1 don't exist in Worker 2")
            print("   Result: Random 401 errors depending on which worker handles the request")
        print("=" * 70)
        
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        print("\nMake sure:")
        print("  1. Backend is running on port 8000")
        print("  2. MongoDB is accessible")
        print("  3. Gunicorn is running with multiple workers")

if __name__ == "__main__":
    main()
