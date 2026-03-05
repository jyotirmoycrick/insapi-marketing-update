import { UniversalFAQ } from '@/components/UniversalFAQ';

export function ShopifyFAQSection() {
  return (
    <UniversalFAQ
      page="shopify"
      defaultHeading="FAQs"
      defaultSubheading="Find answers to common questions about Shopify development"
      defaultFAQs={[
        {
          question: "What is Shopify?",
          answer: "Shopify is a leading e-commerce platform that allows businesses to create and manage online stores. It provides everything you need to sell products online, including hosting, payment processing, and inventory management."
        },
        {
          question: "How long does it take to build a Shopify store?",
          answer: "A basic Shopify store can be set up in 1-2 weeks, while a fully customized store with advanced features typically takes 4-8 weeks depending on complexity and requirements."
        },
        {
          question: "Can you migrate my existing store to Shopify?",
          answer: "Yes, we can migrate your existing store from platforms like WooCommerce, Magento, or BigCommerce to Shopify while preserving your products, customer data, and order history."
        },
        {
          question: "Do you provide ongoing support after launch?",
          answer: "Yes, we offer ongoing support and maintenance packages to ensure your store runs smoothly, stays updated, and continues to perform optimally after launch."
        },
        {
          question: "What's the difference between Shopify and Shopify Plus?",
          answer: "Shopify Plus is the enterprise version designed for high-volume businesses, offering advanced features, dedicated support, and greater customization options compared to standard Shopify plans."
        }
      ]}
    />
  );
}
