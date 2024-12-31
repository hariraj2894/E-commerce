import React from 'react';


const Button = ({ href, children }) => (
  <a 
    href={href} 
    style={{ 
      padding: '15px 30px', 
      fontSize: '1.2rem', 
      background: 'linear-gradient(to right, #ff426c, #ff4b2b)', 
      color: '#fff', 
      border: 'none', 
      borderRadius: '30px', 
      textDecoration: 'none', 
      cursor: 'pointer' 
    }}
  >
    {children}
  </a>
);


const ProductCard = ({ imageSrc, title, description }) => (
  <div style={{ width: '250px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
    <img src={imageSrc} alt={title} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3 style={{ fontSize: '1.2rem' }}>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

// Reusable Event Card Component
const EventCard = ({ imageSrc, title, description }) => (
  <div style={{ width: '300px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
    <img src={imageSrc} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3 style={{ fontSize: '1.2rem' }}>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

// Hero Section
const Hero = () => (
  <section 
    style={{ 
      backgroundImage: 'url(https://img.freepik.com/premium-photo/shopping-cart-phone-with-number-items-it_902639-7323.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '500px', 
      color: '#fff', 
      textAlign: 'center', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '20px' 
    }}
  >
    <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>Support, Embrace Tradition</h1>
    <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>
      Discover products from India’s.
    </p>
    <Button href="/productsList">Shop Now</Button>
  </section>
);

// About Section
const About = () => (
  <section style={{ textAlign: 'center', padding: '50px' }}>
    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Empowering India</h2>
    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
    Quality Products, Unbeatable Prices":
Meaning: This tagline emphasizes two key aspects that appeal to consumers: the quality of the products and the value they get for their money. It tells your audience that they will find premium, well-made products at a price that is hard to beat.

Target Audience: This works well for stores that offer a broad range of products across categories such as electronics, home goods, beauty, or everyday essentials, where value for money is important.
    </p>
  </section>
);

// Featured Products Section
const FeaturedProducts = () => (
  <section style={{ padding: '50px', backgroundColor: '#fff' }}>
    <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '20px' }}>Featured Products</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
      {['Handwoven Saree', 'Intricate Embroidery Kurti', 'Handmade Pottery'].map((product, index) => (
        <ProductCard 
          key={index} 
          imageSrc="data:image/jpeg;base64,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" 
          title={product} 
          description="Explore the latest creations from skilled artisans." 
        />
      ))}
    </div>
  </section>
);

// Call-to-Action Section for Artisan Registration
const ArtisanCTA = () => (
  <section style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9f9f9' }}>
    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Are You an Seller?</h2>
    <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
      Join our platform to showcase your products, track your earnings, and participate in global exhibitions.
    </p>
    <Button href="/artisian-register">Register as an Seller</Button>
  </section>
);

// Events Section
const Events = () => (
  <section style={{ padding: '50px' }}>
    <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '20px' }}>Events and Highlights</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
      {['Local Handicraft Fair', 'Online Exhibition', 'Artisan of the Month'].map((event, index) => (
        <EventCard 
          key={index} 
          imageSrc="https://th.bing.com/th/id/OIP.vvtzKTNg3izjC9FSrtdTOQHaEC?w=274&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
          title={event} 
          description="Don't miss out on this exciting event!" 
        />
      ))}
    </div>
  </section>
);

// Footer Section
const Footer = () => (
  <footer style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '20px 0' }}>
    <p>&copy; 2024 HandmadeHub. All Rights Reserved.</p>
  </footer>
);

// Home Page Component
const Home = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', color: '#333' }}>
      <Hero />
      <About />
      <FeaturedProducts />
      <ArtisanCTA />
      <Events />
      <Footer />
    </div>
  );
};

export default Home;
