 

export function ThankYouPage() {
  return (
    <section className="min-h-[65vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-8 w-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Thank You!</h1>
        <p className="mt-3 text-gray-700">Your form has been submitted successfully.</p>
      </div>
    </section>
  );
}
