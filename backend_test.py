import requests
import sys
import json
from datetime import datetime

class InsAPIBackendTester:
    def __init__(self, base_url="https://drag-drop-builder-11.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200]
                })
                try:
                    return False, response.json()
                except:
                    return False, response.text

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "error": str(e)
            })
            return False, {}

    def test_health_check(self):
        """Test health check endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )
        return success

    def test_admin_login(self):
        """Test admin login and get token"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "admin/login",
            200,
            data={"username": "malo", "password": "1234567890"}
        )
        if success and isinstance(response, dict) and 'token' in response:
            self.token = response['token']
            print(f"   Token received: {self.token[:20]}...")
            return True
        return False

    def test_admin_verify(self):
        """Test admin token verification"""
        if not self.token:
            print("❌ No token available for verification")
            return False
        
        success, response = self.run_test(
            "Admin Token Verification",
            "GET",
            f"admin/verify?token={self.token}",
            200
        )
        return success and isinstance(response, dict) and response.get('valid', False)

    def test_cms_content_get(self):
        """Test getting CMS content for home page"""
        success, response = self.run_test(
            "Get Home Page Content",
            "GET",
            "cms/content/home",
            200
        )
        return success

    def test_cms_seed_content(self):
        """Test seeding default content"""
        if not self.token:
            print("❌ No token available for seeding content")
            return False
        
        success, response = self.run_test(
            "Seed Default Content",
            "POST",
            f"cms/seed?token={self.token}",
            200
        )
        return success

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_contact = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "1234567890",
            "subject": "Test Submission",
            "source": "home"
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact/submit",
            200,
            data=test_contact
        )
        return success and isinstance(response, dict) and response.get('status') == 'success'

    def test_get_contacts(self):
        """Test getting all contacts (admin only)"""
        if not self.token:
            print("❌ No token available for getting contacts")
            return False
        
        success, response = self.run_test(
            "Get All Contacts",
            "GET",
            f"contacts?token={self.token}",
            200
        )
        return success

    def test_cms_pages_list(self):
        """Test getting list of all pages"""
        success, response = self.run_test(
            "Get All Pages List",
            "GET",
            "cms/pages",
            200
        )
        return success

    def test_service_pages_content(self):
        """Test getting content for service pages"""
        service_pages = [
            "branding-pr",
            "content-marketing", 
            "google-ads",
            "meta-ads",
            "shopify",
            "social-media"
        ]
        
        all_passed = True
        for page in service_pages:
            success, response = self.run_test(
                f"Get {page} Page Content",
                "GET",
                f"cms/content/{page}",
                200
            )
            if not success:
                all_passed = False
        
        return all_passed

def main():
    print("🚀 Starting InsAPI Marketing Backend API Tests")
    print("=" * 60)
    
    tester = InsAPIBackendTester()
    
    # Test sequence
    tests = [
        ("Health Check", tester.test_health_check),
        ("Admin Login", tester.test_admin_login),
        ("Admin Token Verification", tester.test_admin_verify),
        ("CMS Content Get", tester.test_cms_content_get),
        ("CMS Seed Content", tester.test_cms_seed_content),
        ("Contact Form Submission", tester.test_contact_form_submission),
        ("Get Contacts", tester.test_get_contacts),
        ("CMS Pages List", tester.test_cms_pages_list),
        ("Service Pages Content", tester.test_service_pages_content),
    ]
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            if not result:
                print(f"⚠️  {test_name} failed but continuing...")
        except Exception as e:
            print(f"💥 {test_name} crashed: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if tester.failed_tests:
        print(f"\n❌ FAILED TESTS:")
        for i, failure in enumerate(tester.failed_tests, 1):
            print(f"{i}. {failure.get('test', 'Unknown')}")
            if 'error' in failure:
                print(f"   Error: {failure['error']}")
            else:
                print(f"   Expected: {failure.get('expected')}, Got: {failure.get('actual')}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())