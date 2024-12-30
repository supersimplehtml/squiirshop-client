import React, { useEffect, useRef } from 'react';

const About = () => {
  const sectionRefs = {
    hero: useRef(null),
    mainContentText: useRef(null),
    mainContentImage: useRef(null),
    features: [],
    cta: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements
    Object.values(sectionRefs).forEach((ref) => {
      if (Array.isArray(ref)) {
        ref.forEach((item, index) => {
          if (item.current) {
            item.current.style.opacity = 0;
            item.current.style.transform = 'translateY(50px)';
            item.current.style.transition = `all 1s ease-out ${index * 0.2}s`; // Stagger animation
            observer.observe(item.current);
          }
        });
      } else if (ref.current) {
        ref.current.style.opacity = 0;
        ref.current.style.transform = 'translateY(50px)';
        ref.current.style.transition = 'all 1s ease-out';
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen  text-white py-20 px-4 md:px-8" style={{
          background: 'linear-gradient(270deg, #240046 0%, #ff6d00 100%)',
    }}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div ref={sectionRefs.hero} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#ff6d00] to-[#ff9e00] text-transparent bg-clip-text">
            Welcome to SquirShop
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Your Destination for Quality and Convenience
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div
            ref={sectionRefs.mainContentText}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed">
              At SquirShop, we believe shopping should be more than just a transaction. 
              We're committed to creating an exceptional online shopping experience that 
              combines quality products, seamless navigation, and outstanding customer service.
            </p>
            <p className="text-lg leading-relaxed">
              Our mission is to bring you a carefully curated selection of products that 
              enhance your lifestyle while ensuring every interaction with us exceeds 
              your expectations.
            </p>
          </div>
          <div
            ref={sectionRefs.mainContentImage}
            className="relative h-80 rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff7900] to-[#ff9100] opacity-20"></div>
            <img 
              src="src/models/d02e2c2e-eae9-4e41-a3bf-aab3f3484ccb.webp" 
              alt="SquirShop Experience"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: 'Fast Shipping',
              description: 'Quick and reliable delivery to your doorstep',
              icon: '🚚',
            },
            {
              title: '24/7 Support',
              description: 'Always here to help when you need us',
              icon: '💬',
            },
            {
              title: 'Quality Products',
              description: 'Carefully selected items that meet our high standards',
              icon: '⭐',
            },
          ].map((feature, index) => {
            const ref = React.createRef();
            sectionRefs.features.push(ref);
            return (
              <div
                key={index}
                ref={ref}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#ff9e00]">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div ref={sectionRefs.cta} className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <button className="bg-gradient-to-r from-[#ff7900] to-[#ff9100] text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-shadow duration-300">
            Explore Our Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
