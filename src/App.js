import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Header Component
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <div className="company-info">
            <h1 className="company-name">SD CHÂSSIS</h1>
            <p className="company-tagline">Vos châssis jusqu'à 50% moins chers pour les professionnels et le particulier</p>
          </div>
          <div className="contact-info">
            <div className="contact-item">
              <span>📧 stephane@sdchassis.be</span>
            </div>
            <div className="contact-item">
              <span>📧 sdemeuse@outlook.com</span>
            </div>
            <div className="contact-item">
              <span>📞 0478 73 79 46</span>
            </div>
            <Link to="/devis" className="cta-button">Obtenir un Devis</Link>
          </div>
        </div>
        <nav className="navigation">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/realisations" className="nav-link">Nos réalisations</Link>
          <Link to="/fabricants" className="nav-link">Nos fabricants</Link>
          <Link to="/catalogues" className="nav-link">Catalogues</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="logo-container">
          <div className="company-logo">
            <img 
              src="https://customer-assets.emergentagent.com/job_mon-site-save/artifacts/ncwl5xar_logo%20225.png" 
              alt="SD CHÂSSIS Logo" 
              className="company-logo-image"
            />
          </div>
        </div>
        <h2 className="hero-title">SD CHÂSSIS</h2>
        <p className="hero-description">
          Spécialistes en châssis PVC, Aluminium et Bois<br/>
          Qualité professionnelle à prix compétitifs
        </p>
        <div className="hero-buttons">
          <Link to="/devis" className="hero-cta-primary">Demander un devis gratuit</Link>
          <Link to="/realisations" className="hero-cta-secondary">Voir nos réalisations</Link>
        </div>
      </div>
    </section>
  );
};

// Home Page
const Home = () => {
  const [chassisTypes, setChassisTypes] = useState([]);
  const [realisations, setRealisations] = useState([]);

  useEffect(() => {
    fetchChassisTypes();
    fetchRealisations();
  }, []);

  const fetchChassisTypes = async () => {
    try {
      const response = await axios.get(`${API}/chassis-types`);
      setChassisTypes(response.data.slice(0, 3)); // Show only first 3
    } catch (error) {
      console.error('Erreur lors du chargement des types de châssis:', error);
    }
  };

  const fetchRealisations = async () => {
    try {
      const response = await axios.get(`${API}/realisations`);
      setRealisations(response.data.slice(0, 3)); // Show only first 3
    } catch (error) {
      console.error('Erreur lors du chargement des réalisations:', error);
    }
  };

  return (
    <div>
      <HeroSection />
      
      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Nos Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Châssis Résidentiels</h3>
              <p>Solutions complètes pour votre habitation</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Projets Commerciaux</h3>
              <p>Châssis pour bureaux et commerces</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Sur Mesure</h3>
              <p>Conception et fabrication personnalisées</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chassis Types Preview */}
      <section className="chassis-preview">
        <div className="container">
          <h2 className="section-title">Nos Fabricants Partenaires</h2>
          <div className="chassis-grid">
            <div className="chassis-card">
              <div className="chassis-info">
                <h3>Fabricants Européens</h3>
                <p>Partenariats directs avec les meilleurs fabricants européens : DEKEUNINCK, ALUPLAST, KÖMMERLING, SCHÜCO, ALIPLAST, ALUPROF</p>
                <div className="chassis-features">
                  <span className="feature-tag">Prix d'usine</span>
                  <span className="feature-tag">Normes européennes</span>
                </div>
                <div className="chassis-price">Jusqu'à -50%</div>
              </div>
            </div>
            <div className="chassis-card">
              <div className="chassis-info">
                <h3>Livraison Directe</h3>
                <p>Du fabricant à votre chantier sans intermédiaires. Pas de frais de stockage, que des économies pour vous.</p>
                <div className="chassis-features">
                  <span className="feature-tag">Sans stockage</span>
                  <span className="feature-tag">Livraison rapide</span>
                </div>
                <div className="chassis-price">0€ stockage</div>
              </div>
            </div>
            <div className="chassis-card">
              <div className="chassis-info">
                <h3>SAV Européen</h3>
                <p>Service après-vente assuré directement par les fabricants en moins d'une semaine partout en Europe.</p>
                <div className="chassis-features">
                  <span className="feature-tag">SAV rapide</span>
                  <span className="feature-tag">Support direct</span>
                </div>
                <div className="chassis-price">Moins d'1 semaine</div>
              </div>
            </div>
          </div>
          <div className="section-cta">
            <Link to="/fabricants" className="cta-button">Découvrir nos fabricants</Link>
          </div>
        </div>
      </section>

      {/* Realisations Preview */}
      <section className="realisations-preview">
        <div className="container">
          <h2 className="section-title">Nos Dernières Réalisations</h2>
          <div className="realisations-grid">
            {realisations.map((realisation) => (
              <div key={realisation.id} className="realisation-card">
                {realisation.images[0] && (
                  <img src={realisation.images[0]} alt={realisation.title} className="realisation-image" />
                )}
                <div className="realisation-info">
                  <h3>{realisation.title}</h3>
                  <p className="realisation-location">📍 {realisation.location}</p>
                  <p className="realisation-description">{realisation.description}</p>
                  <span className="realisation-type">{realisation.project_type}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/realisations" className="cta-button">Voir toutes nos réalisations</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Fabricants Page
const FabricantsPage = () => {
  const fabricants = [
    {
      id: 1,
      name: "DEKEUNINCK",
      description: "Leader mondial en solutions PVC innovantes, reconnu pour ses performances énergétiques exceptionnelles.",
      specialite: "Châssis PVC premium",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Deceuninck_logo.svg/320px-Deceuninck_logo.svg.png"
    },
    {
      id: 2,
      name: "ALUPLAST",
      description: "Fabricant allemand de référence pour les systèmes de fenêtres PVC de haute qualité.",
      specialite: "Systèmes PVC allemands",
      logo: "https://www.fachpack.de/content/dam/mesago/fachpack/de/images/logos/exhibitors/2022/aluplast.png"
    },
    {
      id: 3,
      name: "KÖMMERLING",
      description: "Expertise allemande depuis 1897, leader en innovation et qualité des profilés PVC.",
      specialite: "Profilés PVC innovants",
      logo: "https://logos-world.net/wp-content/uploads/2022/01/Kommerling-Logo.png"
    },
    {
      id: 4,
      name: "SCHÜCO",
      description: "Pionnier mondial des systèmes aluminium et PVC pour l'enveloppe du bâtiment.",
      specialite: "Systèmes aluminium premium",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sch%C3%BCco_logo.svg/320px-Sch%C3%BCco_logo.svg.png"
    },
    {
      id: 5,
      name: "ALIPLAST",
      description: "Fabricant polonais spécialisé dans les systèmes aluminium innovants et performants.",
      specialite: "Châssis aluminium européens",
      logo: "https://www.aliplast.eu/wp-content/uploads/2021/03/logo-aliplast.png"
    },
    {
      id: 6,
      name: "ALUPROF",
      description: "Fabricant européen de systèmes aluminium architecturaux de haute performance.",
      specialite: "Solutions aluminium architecturales",
      logo: "https://www.aluprof.eu/sites/default/files/styles/max_325x325/public/2021-04/aluprof_logo_0.png"
    }
  ];

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Nos Fabricants Partenaires</h1>
        <p className="page-description">
          Nous collaborons directement avec les meilleurs fabricants européens pour vous offrir des prix d'usine jusqu'à 50% moins chers
        </p>

        {/* Avantages de travailler avec nos fabricants */}
        <div className="fabricants-advantages">
          <h2 className="section-subtitle">Pourquoi nos fabricants partenaires ?</h2>
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="advantage-icon">🏭</div>
              <h3>Prix d'usine directs</h3>
              <p>Collaboration directe sans intermédiaires = jusqu'à 50% d'économies</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🇪🇺</div>
              <h3>Normes européennes</h3>
              <p>Tous nos fabricants respectent les normes européennes les plus strictes</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🚚</div>
              <h3>Livraison directe</h3>
              <p>Du fabricant à votre chantier, sans frais de stockage</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">⚡</div>
              <h3>Service après-vente</h3>
              <p>SAV rapide assuré directement par les fabricants en moins d'une semaine</p>
            </div>
          </div>
        </div>

        {/* Grille des fabricants */}
        <div className="fabricants-grid">
          {fabricants.map((fabricant) => (
            <div key={fabricant.id} className="fabricant-card">
              <div className="fabricant-logo-container">
                {fabricant.id === 1 ? (
                  <img 
                    src="https://customer-assets.emergentagent.com/job_mon-site-save/artifacts/yxjxh8ca_OIP%20%281%29.webp"
                    alt="Logo DEKEUNINCK"
                    className="fabricant-real-logo"
                  />
                ) : fabricant.id === 2 ? (
                  <img 
                    src="https://customer-assets.emergentagent.com/job_mon-site-save/artifacts/4n9g9o5b_OIP.webp"
                    alt="Logo ALUPLAST"
                    className="fabricant-real-logo"
                  />
                ) : fabricant.id === 3 ? (
                  <img 
                    src="https://customer-assets.emergentagent.com/job_mon-site-save/artifacts/cya3a0jo_kommerling%20logo.PNG"
                    alt="Logo KÖMMERLING"
                    className="fabricant-real-logo"
                  />
                ) : fabricant.id === 4 ? (
                  <img 
                    src="https://customer-assets.emergentagent.com/job_mon-site-save/artifacts/8i3tf367_739a6992f0ef5fc9e254b44ec0708001.jpg"
                    alt="Logo SCHÜCO"
                    className="fabricant-real-logo"
                  />
                ) : fabricant.id === 5 ? (
                  <img 
                    src="https://customer-assets.emergentagent.com/job_mon-site-save/artifacts/l7wq4m9f_aliplast%20logo.PNG"
                    alt="Logo ALIPLAST"
                    className="fabricant-real-logo"
                  />
                ) : fabricant.id === 6 ? (
                  <img 
                    src="https://customer-assets.emergentagent.com/job_mon-site-save/artifacts/g27rz0bv_aluprof%20logo.PNG"
                    alt="Logo ALUPROF"
                    className="fabricant-real-logo"
                  />
                ) : (
                  <div className={`fabricant-logo-design fabricant-${fabricant.id}`}>
                    <span className="fabricant-name-logo">{fabricant.name}</span>
                  </div>
                )}
              </div>
              <div className="fabricant-info">
                <div className="fabricant-specialite">{fabricant.specialite}</div>
                <p className="fabricant-description">{fabricant.description}</p>
                <div className="fabricant-features">
                  <span className="feature-badge">✓ Prix d'usine</span>
                  <span className="feature-badge">✓ Qualité européenne</span>
                  <span className="feature-badge">✓ SAV rapide</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section contact */}
        <div className="fabricants-contact">
          <h2>Intéressé par nos fabricants ?</h2>
          <p>Contactez-nous pour discuter de votre projet et découvrir quel fabricant correspond le mieux à vos besoins.</p>
          <div className="contact-actions">
            <Link to="/devis" className="cta-button">Demander un devis gratuit</Link>
            <Link to="/contact" className="cta-button-secondary">Nous contacter</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chassis Page (kept for reference but renamed)
const ChassisPage = () => {
  const [chassisTypes, setChassisTypes] = useState([]);

  useEffect(() => {
    fetchChassisTypes();
  }, []);

  const fetchChassisTypes = async () => {
    try {
      const response = await axios.get(`${API}/chassis-types`);
      setChassisTypes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des types de châssis:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Nos Châssis</h1>
        <p className="page-description">
          Découvrez notre gamme complète de châssis adaptés à tous vos besoins
        </p>
        <div className="chassis-full-grid">
          {chassisTypes.map((chassis) => (
            <div key={chassis.id} className="chassis-detailed-card">
              {chassis.image_url && (
                <img src={chassis.image_url} alt={chassis.name} className="chassis-image" />
              )}
              <div className="chassis-info">
                <h3>{chassis.name}</h3>
                <p>{chassis.description}</p>
                <div className="chassis-features">
                  {chassis.features.map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="chassis-price">{chassis.price_range}</div>
                <Link to="/devis" className="cta-button-small">Demander un devis</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Realisations Page
const RealisationsPage = () => {
  const [realisations, setRealisations] = useState([]);

  useEffect(() => {
    fetchRealisations();
  }, []);

  const fetchRealisations = async () => {
    try {
      const response = await axios.get(`${API}/realisations`);
      setRealisations(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des réalisations:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Nos Réalisations</h1>
        <p className="page-description">
          Découvrez quelques-uns de nos projets récents
        </p>
        <div className="realisations-full-grid">
          {realisations.map((realisation) => (
            <div key={realisation.id} className="realisation-detailed-card">
              <div className="realisation-images">
                {realisation.images.map((image, index) => (
                  <img key={index} src={image} alt={`${realisation.title} ${index + 1}`} className="realisation-image" />
                ))}
              </div>
              <div className="realisation-info">
                <h3>{realisation.title}</h3>
                <div className="realisation-meta">
                  <span className="realisation-location">📍 {realisation.location}</span>
                  <span className="realisation-date">📅 {realisation.completion_date}</span>
                  <span className="realisation-type">{realisation.project_type}</span>
                </div>
                <p className="realisation-description">{realisation.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Devis Page
const DevisPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/devis`, formData);
      setSubmitMessage('Votre demande de devis a été envoyée avec succès! Nous vous contacterons rapidement.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        project_type: '',
        description: ''
      });
    } catch (error) {
      setSubmitMessage('Erreur lors de l\'envoi. Veuillez réessayer.');
      console.error('Erreur lors de l\'envoi du devis:', error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Demander un Devis</h1>
        <p className="page-description">
          Remplissez ce formulaire pour recevoir votre devis personnalisé gratuitement
        </p>
        
        <div className="devis-container">
          <form onSubmit={handleSubmit} className="devis-form">
            <div className="form-group">
              <label htmlFor="name">Nom complet *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Téléphone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="project_type">Type de projet *</label>
              <select
                id="project_type"
                name="project_type"
                value={formData.project_type}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionnez un type</option>
                <option value="Résidentiel">Résidentiel</option>
                <option value="Commercial">Commercial</option>
                <option value="Rénovation">Rénovation</option>
                <option value="Neuf">Construction neuve</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description du projet *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                placeholder="Décrivez votre projet en détail..."
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
            </button>
            
            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('succès') ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}
          </form>
          
          <div className="contact-info-side">
            <h3>Contactez-nous directement</h3>
            <div className="contact-details">
              <p><strong>📧 Email:</strong> stephane@sdchassis.be</p>
              <p><strong>📧 Email:</strong> sdemeuse@outlook.com</p>
              <p><strong>📞 Téléphone:</strong> 0478 73 79 46</p>
              <p><strong>🏢 Atelier:</strong></p>
              <p>Boulevard de l'Europe 152<br/>5060 Auvelais (Sambreville)</p>
              <p><strong>🏛️ Siège social:</strong></p>
              <p>Rue Rogier 4<br/>5300 Andenne</p>
              <p><strong>⏰ Horaires:</strong></p>
              <p>Lun-Ven: 8h00 - 18h00</p>
              <p>Sam: 9h00 - 16h00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Catalogues Page
const CataloguesPage = () => {
  const [catalogues, setCatalogues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchCatalogues();
    fetchCategories();
  }, []);

  const fetchCatalogues = async () => {
    try {
      const response = await axios.get(`${API}/catalogues`);
      setCatalogues(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des catalogues:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/catalogues/categories`);
      setCategories(['all', ...response.data.categories]);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  const filteredCatalogues = selectedCategory === 'all' 
    ? catalogues 
    : catalogues.filter(cat => cat.category === selectedCategory);

  const handleDownload = (pdfUrl, title) => {
    // Open PDF in new tab
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Nos Catalogues</h1>
        <p className="page-description">
          Téléchargez nos catalogues pour découvrir toute notre gamme de produits
        </p>

        {/* Category Filter */}
        <div className="catalogue-filters">
          <h3>Filtrer par catégorie :</h3>
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Tous' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Catalogues Grid */}
        <div className="catalogues-grid">
          {filteredCatalogues.map((catalogue) => (
            <div key={catalogue.id} className="catalogue-card">
              <div className="catalogue-icon">
                📄
              </div>
              <div className="catalogue-info">
                <h3>{catalogue.title}</h3>
                <p className="catalogue-category">{catalogue.category}</p>
                <p className="catalogue-description">{catalogue.description}</p>
                <button 
                  onClick={() => handleDownload(catalogue.pdf_url, catalogue.title)}
                  className="download-button"
                >
                  📥 Télécharger PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="catalogue-info-section">
          <h2>Besoin d'aide ?</h2>
          <div className="info-cards">
            <div className="info-card">
              <h4>📞 Consultation téléphonique</h4>
              <p>Appelez-nous pour discuter de vos besoins : <strong>0478 73 79 46</strong></p>
            </div>
            <div className="info-card">
              <h4>📧 Demande de devis</h4>
              <p>Envoyez-nous vos plans et dimensions pour un devis personnalisé</p>
              <Link to="/devis" className="cta-button-small">Demander un devis</Link>
            </div>
            <div className="info-card">
              <h4>🏪 Visite atelier</h4>
              <p>Venez découvrir nos produits dans nos locaux à Sambreville</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    localite: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitMessage('Votre message a été envoyé avec succès! Nous vous répondrons rapidement.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        localite: '',
        message: ''
      });
    } catch (error) {
      setSubmitMessage('Erreur lors de l\'envoi. Veuillez réessayer.');
      console.error('Erreur lors de l\'envoi du message:', error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 className="page-title">Contact</h1>
        <p className="page-description">
          N'hésitez pas à nous contacter pour toute question
        </p>
        
        <div className="contact-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nom complet *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="placeholder:text-black"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="placeholder:text-black"

              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="placeholder:text-black"

              />
            </div>
            
            <div className="form-group">
              <label htmlFor="localite">Localité *</label>
              <input
                type="text"
                id="localite"
                name="localite"
                value={formData.localite}
                onChange={handleInputChange}
                placeholder="Ville ou commune..."
                required
                className="placeholder:text-black"

              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="6"
                placeholder="Votre message..."
                required
                className="placeholder:text-black"

              ></textarea>
            </div>
            
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
            
            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('succès') ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}
          </form>
          
          <div className="contact-info-side">
            <h3>Nos Coordonnées</h3>
            <div className="contact-details">
              <p><strong>📧 Email:</strong> stephane@sdchassis.be</p>
              <p><strong>📧 Email:</strong> sdemeuse@outlook.com</p>
              <p><strong>📞 Téléphone:</strong> 0478 73 79 46</p>
              <p><strong>🏢 Atelier:</strong></p>
              <p>Boulevard de l'Europe 152<br/>5060 Auvelais (Sambreville)</p>
              <p><strong>🏛️ Siège social:</strong></p>
              <p>Rue Rogier 4<br/>5300 Andenne</p>
              <p><strong>⏰ Horaires d'ouverture:</strong></p>
              <p>Lundi - Vendredi: 8h00 - 18h00</p>
              <p>Samedi: 9h00 - 16h00</p>
              <p>Dimanche: Fermé</p>
            </div>
            
            <div className="why-choose-us">
              <h4>Pourquoi nous choisir?</h4>
              <ul>
                <li>✓ Prix jusqu'à 50% moins chers</li>
                <li>✓ Qualité professionnelle garantie</li>
                <li>✓ Devis gratuit et sans engagement</li>
                <li>✓ Installation par nos experts</li>
                <li>✓ SAV réactif</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>SD CHÂSSIS</h4>
            <p>Vos châssis jusqu'à 50% moins chers pour les professionnels et le particulier</p>
            <p><strong>🏢 Atelier:</strong></p>
            <p>Boulevard de l'Europe 152<br/>5060 Auvelais (Sambreville)</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 stephane@sdchassis.be</p>
            <p>📧 sdemeuse@outlook.com</p>
            <p>📞 0478 73 79 46</p>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <p>Châssis PVC</p>
            <p>Châssis Aluminium</p>
            <p>Châssis Bois</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 SD CHÂSSIS. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fabricants" element={<FabricantsPage />} />
            <Route path="/catalogues" element={<CataloguesPage />} />
            <Route path="/realisations" element={<RealisationsPage />} />
            <Route path="/devis" element={<DevisPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;