import './style.css'

// State management
let currentConversation = [];
let menuOverlay = null;
let isOnLandingPage = true;
let orderBasket = [];
let bookingsHistory = [];

// Initialize the application
function initApp() {
  showLandingPage();
}

// Show landing page
function showLandingPage() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <div class="landing-page">
      <div class="landing-content">
        <div class="logo-container">
          <div class="logo-icon">🏨</div>
        </div>
        <h1 class="company-name">Hotel Concierge</h1>
        <p class="tagline">Experience Luxury at Your Fingertips</p>
        <p class="subtitle">Your 24/7 Virtual Assistant for Exceptional Service</p>
        <button class="welcome-btn" onclick="enterChatbot()">
          <span>Welcome Onboard</span>
          <span class="arrow">→</span>
        </button>
      </div>
      <div class="landing-background">
        <div class="floating-circle circle-1"></div>
        <div class="floating-circle circle-2"></div>
        <div class="floating-circle circle-3"></div>
      </div>
    </div>
  `;
}

// Transition to chatbot
window.enterChatbot = function () {
  const landingPage = document.querySelector('.landing-page');
  landingPage.classList.add('fade-out');

  setTimeout(() => {
    isOnLandingPage = false;
    initChatbot();
  }, 600);
};

// Initialize the chatbot
function initChatbot() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <div class="chat-container">
      <div class="chat-header">
        <h1>🏨 Hotel Concierge</h1>
        <p>Your 24/7 Virtual Assistant</p>
      </div>
      
      <div class="messages-container" id="messages">
      </div>
    </div>
    
    <div class="menu-overlay" id="menuOverlay">
      <div class="menu-header">
        <h2>🍽️ Dining Menu</h2>
        <button class="close-btn" onclick="closeMenu()">×</button>
      </div>
      <div id="menuContent"></div>
    </div>
  `;

  menuOverlay = document.getElementById('menuOverlay');

  // Scroll to top when entering chatbot
  window.scrollTo(0, 0);

  // Send welcome message
  setTimeout(() => {
    addBotMessage('Welcome to our hotel! 🌟 How may I assist you today?', true, true);
  }, 500);
}

// Add bot message
function addBotMessage(text, showServices = false, skipScroll = false) {
  const messagesContainer = document.getElementById('messages');

  // Safety check - return if messages container doesn't exist
  if (!messagesContainer) {
    console.warn('Messages container not found, skipping addBotMessage');
    return;
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot';

  let servicesHTML = '';
  if (showServices) {
    servicesHTML = `
      <div class="service-buttons">
        <button class="service-btn" onclick="handleService('spa')">
          <span>💆 Spa Booking</span>
        </button>
        <button class="service-btn" onclick="handleService('restaurant')">
          <span>🍽️ Restaurant Booking</span>
        </button>
        <button class="service-btn" onclick="handleService('room-dining')">
          <span>🛎️ Room Dining Order</span>
        </button>
        <button class="service-btn" onclick="handleService('housekeeping')">
          <span>🧹 Housekeeping</span>
        </button>
        <button class="service-btn" onclick="handleService('concierge')">
          <span>🎫 Concierge Services</span>
        </button>
        <button class="service-btn" onclick="handleService('laundry')">
          <span>👔 Laundry Service</span>
        </button>
        <button class="service-btn" onclick="handleService('gym')">
          <span>💪 Gym & Fitness</span>
        </button>
        <button class="service-btn" onclick="handleService('transport')">
          <span>🚗 Transportation</span>
        </button>
        <button class="service-btn" onclick="handleService('feedback')">
          <span>💬 Feedback</span>
        </button>
        <button class="service-btn" onclick="handleService('bookings')">
          <span>📋 My Bookings</span>
        </button>
      </div>
    `;
  }

  messageDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      ${text}
      ${servicesHTML}
    </div>
  `;

  messagesContainer.appendChild(messageDiv);

  // Only scroll if not explicitly skipped
  if (!skipScroll && typeof scrollToBottom === 'function') {
    scrollToBottom();
  }
}

// Add user message
function addUserMessage(text) {
  const messagesContainer = document.getElementById('messages');

  // Safety check - return if messages container doesn't exist
  if (!messagesContainer) {
    console.warn('Messages container not found, skipping addUserMessage');
    return;
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user';

  messageDiv.innerHTML = `
    <div class="message-avatar">👤</div>
    <div class="message-content">${text}</div>
  `;

  messagesContainer.appendChild(messageDiv);

  if (typeof scrollToBottom === 'function') {
    scrollToBottom();
  }
}

// Handle service selection
window.handleService = function (service) {
  const serviceNames = {
    'spa': 'Spa Booking',
    'restaurant': 'Restaurant Booking',
    'room-dining': 'Room Dining Order',
    'housekeeping': 'Housekeeping',
    'concierge': 'Concierge Services',
    'laundry': 'Laundry Service',
    'gym': 'Gym & Fitness',
    'transport': 'Transportation',
    'feedback': 'Feedback',
    'bookings': 'My Bookings'
  };

  // Show bookings page for bookings service
  if (service === 'bookings') {
    showBookingsPage();
  } else {
    // All other services open in dedicated pages
    showServicePage(service, serviceNames[service]);
  }
};

// Show service page
function showServicePage(service, serviceName) {
  const app = document.querySelector('#app');

  const serviceContent = {
    'housekeeping': {
      icon: '🧹',
      description: 'Professional housekeeping services for your comfort',
      features: [
        'Daily room cleaning',
        'Bed making and linen change',
        'Bathroom sanitization',
        'Trash removal',
        'Towel replacement',
        'Minibar restocking'
      ],
      availability: '24/7 Service Available',
      contact: 'Dial 101 from your room phone'
    },
    'concierge': {
      icon: '🎫',
      description: 'Your personal assistant for local experiences',
      features: [
        'Local attraction recommendations',
        'Event ticket booking',
        'Restaurant reservations',
        'Tour arrangements',
        'Travel planning assistance',
        'Special requests handling'
      ],
      availability: '8:00 AM - 10:00 PM',
      contact: 'Dial 102 from your room phone',
      hasConciergeRequest: true
    },
    'laundry': {
      icon: '👔',
      description: 'Professional laundry and dry cleaning services',
      features: [
        'Wash and fold service',
        'Dry cleaning',
        'Ironing and pressing',
        'Same-day service available',
        'Stain removal',
        'Shoe polishing'
      ],
      availability: '7:00 AM - 9:00 PM',
      contact: 'Dial 103 from your room phone'
    },
    'gym': {
      icon: '💪',
      description: 'State-of-the-art fitness center',
      features: [
        'Modern cardio equipment',
        'Free weights and machines',
        'Personal training available',
        'Yoga and meditation classes',
        'Locker rooms with showers',
        'Complimentary towels and water'
      ],
      availability: '5:00 AM - 11:00 PM',
      contact: 'Located on 2nd Floor',
      customHTML: `
         <div class="gym-hero" style="width:100%; height:200px; background:url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000') center/cover; border-radius:12px; margin-bottom:1.5rem;"></div>
         
         <div class="occupancy-tracker" style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:12px; margin-bottom:1.5rem;">
           <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
             <span>Live Occupancy</span>
             <span style="color:#4ade80;">🟢 Quiet (45%)</span>
           </div>
           <div style="width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:4px;">
             <div style="width:45%; height:100%; background:#4ade80; border-radius:4px;"></div>
           </div>
         </div>

         <div class="class-schedule" style="margin-bottom:1.5rem;">
           <h3>Today's Classes</h3>
           <div class="schedule-item" style="display:flex; justify-content:space-between; align-items:center; padding:1rem; border-bottom:1px solid rgba(255,255,255,0.1);">
             <div>
               <div style="font-weight:bold;">Yoga Flow</div>
               <div style="font-size:0.9rem; color:#aaa;">08:00 AM • Studio A</div>
             </div>
             <button onclick="joinGymClass(this, 'Yoga Flow', '🧘')" style="padding:0.5rem 1rem; background:var(--primary-gradient); border:none; border-radius:6px; color:white; cursor:pointer; min-width: 80px;">Join</button>
           </div>
           <div class="schedule-item" style="display:flex; justify-content:space-between; align-items:center; padding:1rem; border-bottom:1px solid rgba(255,255,255,0.1);">
             <div>
               <div style="font-weight:bold;">HIIT Blast</div>
               <div style="font-size:0.9rem; color:#aaa;">06:00 PM • Studio B</div>
             </div>
             <button onclick="joinGymClass(this, 'HIIT Blast', '🔥')" style="padding:0.5rem 1rem; background:var(--primary-gradient); border:none; border-radius:6px; color:white; cursor:pointer; min-width: 80px;">Join</button>
           </div>
         </div>
       `
    },
    'transport': {
      icon: '🚗',
      description: 'Convenient transportation services',
      features: [
        'Airport pickup and drop-off',
        'City tours',
        'Car rental assistance',
        'Taxi booking',
        'Chauffeur services',
        'Valet parking'
      ],
      availability: '24/7 Service Available',
      contact: 'Dial 104 from your room phone'
    },
    'spa': {
      icon: '💆',
      description: 'Relax and rejuvenate with our premium spa services',
      features: [
        'Full body massage',
        'Aromatherapy sessions',
        'Facial treatments',
        'Hot stone therapy',
        'Couples spa packages',
        'Sauna and steam room'
      ],
      availability: '9:00 AM - 9:00 PM',
      contact: 'Book your appointment below',
      hasBooking: true
    },
    'restaurant': {
      icon: '🍽️',
      description: 'Fine dining experience with international cuisine',
      features: [
        'Multi-cuisine restaurant',
        'Private dining rooms',
        'Chef\'s special menu',
        'Wine and cocktail bar',
        'Outdoor seating available',
        'Live music on weekends'
      ],
      availability: '7:00 AM - 11:00 PM',
      contact: 'Reserve your table below',
      hasBooking: true
    },
    'room-dining': {
      icon: '🛎️',
      description: 'Enjoy delicious meals in the comfort of your room',
      features: [
        'Vegetarian menu',
        'Non-vegetarian menu',
        'Breakfast, lunch & dinner',
        'Snacks and beverages',
        'Special dietary options',
        '24-hour service'
      ],
      availability: '24/7 Service Available',
      contact: 'Browse our menu below',
      hasMenu: true
    },
    'feedback': {
      icon: '💬',
      description: 'We value your feedback to serve you better',
      features: [
        'Share your experience',
        'Suggest improvements',
        'Report issues',
        'Compliment our staff',
        'Rate our services',
        'Help us improve'
      ],
      availability: 'Always Open',
      contact: 'Submit your feedback below',
      hasFeedbackForm: true
    }
  };

  const info = serviceContent[service];

  let actionButton = '';
  if (info.hasBooking) {
    actionButton = `<button class="action-btn" onclick="showBookingFormOnPage('${service}')">Book Now</button>`;
  } else if (info.hasMenu) {
    actionButton = `<button class="action-btn" onclick="showMenuOnPage()">View Menu</button>`;
  } else if (info.hasFeedbackForm) {
    actionButton = `<button class="action-btn" onclick="showFeedbackFormOnPage()">Submit Feedback</button>`;
  } else if (service === 'housekeeping') {
    actionButton = `<button class="action-btn" onclick="requestHousekeeping()">Request Housekeeping</button>`;
  } else if (service === 'laundry') {
    actionButton = `<button class="action-btn" onclick="requestLaundry()">Request Laundry Pickup</button>`;
  } else if (service === 'transport') {
    actionButton = `
      <div style="display: flex; gap: 1rem; width: 100%; justify-content: center;">
        <button class="action-btn" onclick="openCabBooking()">🚖 Book a Cab</button>
        <button class="action-btn" onclick="requestValet()">🔑 Request Valet</button>
      </div>
    `;
  } else if (info.hasConciergeRequest) {
    actionButton = `<button class="action-btn" onclick="showConciergeApp()">Launch Concierge AI 🤖</button>`;
  }

  app.innerHTML = `
    <div class="service-page">
      <div class="service-page-header">
        <button class="back-btn" onclick="returnToChatbot()">
          <span>←</span> Back to Services
        </button>
      </div>
      
      <div class="service-page-content">
        <div class="service-icon-large">${info.icon}</div>
        <h1 class="service-title">${serviceName}</h1>
        <p class="service-description">${info.description}</p>
        
        ${info.customHTML ? info.customHTML : ''}
        
        <div class="service-features">
          <h2>Services Included:</h2>
          <ul class="features-list">
            ${info.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        
        <div class="service-info-cards">
          <div class="info-card">
            <div class="info-icon">🕐</div>
            <div class="info-label">Availability</div>
            <div class="info-value">${info.availability}</div>
          </div>
          <div class="info-card">
            <div class="info-icon">📞</div>
            <div class="info-label">Contact</div>
            <div class="info-value">${info.contact}</div>
          </div>
        </div>
        
        ${actionButton ? `<div class="action-button-container">${actionButton}</div>` : ''}
      </div>
    </div>
  `;
}

// Return to chatbot
window.returnToChatbot = function () {
  // Close all page overlays first
  const overlays = document.querySelectorAll('.page-form-overlay');
  overlays.forEach(overlay => overlay.remove());

  // Then initialize chatbot
  initChatbot();
};

// Helper to add service request
window.addServiceRequest = function (service, details) {
  const reference = 'REQ-' + Math.floor(1000 + Math.random() * 9000);
  bookingsHistory.push({
    type: 'service_request',
    service: service,
    details: details,
    reference: reference,
    timestamp: new Date()
  });
};

// Request housekeeping service
window.requestHousekeeping = function () {
  const confirmHTML = `
    <div class="page-form-overlay">
      <div class="page-form-container">
        <div class="confirmation-card">
          <h3>✅ Housekeeping Request Received!</h3>
          <p style="margin-top: 1rem; font-size: 1.1rem;">
            Our housekeeping attendant will attend to you soon.
          </p>
          <p style="margin-top: 0.5rem; color: var(--text-secondary);">
            Estimated arrival time: 10-15 minutes
          </p>
        </div>
        <button class="submit-btn" onclick="returnToChatbot()" style="margin-top: 1rem;">Back to Services</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', confirmHTML);
  window.addServiceRequest('Housekeeping', 'Room cleaning requested. Arrival in 10-15 mins.');
};

// Request Laundry Service
window.requestLaundry = function () {
  const confirmHTML = `
    <div class="page-form-overlay">
      <div class="page-form-container">
        <div class="confirmation-card">
          <h3>✅ Laundry Request Received!</h3>
          <p style="margin-top: 1rem; font-size: 1.1rem;">
            Our valet will be at your door shortly to collect your laundry.
          </p>
          <p style="margin-top: 0.5rem; color: var(--text-secondary);">
            Estimated arrival time: 5-10 minutes
          </p>
        </div>
        <button class="submit-btn" onclick="returnToChatbot()" style="margin-top: 1rem;">Back to Services</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', confirmHTML);
  window.addServiceRequest('Laundry Service', 'Valet pickup requested. Arrival in 5-10 mins.');
};

// Open Cab Booking Modal
window.openCabBooking = function () {
  const modalHTML = `
    <div class="page-form-overlay" id="cabModal">
      <div class="page-form-container" style="max-width: 400px;">
        <div class="confirmation-card" style="text-align: left;">
          <h3 style="display:flex; justify-content:space-between; align-items:center;">
            🚖 Book a Ride <button onclick="document.getElementById('cabModal').remove()" style="background:none; border:none; color:white; font-size:1.5rem; cursor:pointer;">&times;</button>
          </h3>
          <div style="margin-top: 1.5rem;">
            <label style="display:block; margin-bottom:0.5rem; color:#aaa;">Destination</label>
            <select id="cabDestination" style="width:100%; padding:0.8rem; border-radius:8px; background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2);">
              <option value="Airport">✈️ International Airport</option>
              <option value="City Centre">🏙️ City Centre</option>
              <option value="Shopping Mall">🛍️ Shopping Mall</option>
              <option value="Railway Station">🚆 Railway Station</option>
            </select>
            
            <label style="display:block; margin-top:1rem; margin-bottom:0.5rem; color:#aaa;">Vehicle Type</label>
            <div style="display:flex; gap:0.5rem;">
              <button class="vehicle-select-btn selected" onclick="selectVehicle(this)" style="flex:1; padding:0.8rem; border-radius:8px; background:var(--primary-gradient); border:1px solid rgba(255,255,255,0.5); color:white; font-weight:bold; transform:scale(1.05); transition:all 0.2s;">Sedan</button>
              <button class="vehicle-select-btn" onclick="selectVehicle(this)" style="flex:1; padding:0.8rem; border-radius:8px; background:rgba(255,255,255,0.1); border:1px solid transparent; color:white; transition:all 0.2s;">SUV</button>
              <button class="vehicle-select-btn" onclick="selectVehicle(this)" style="flex:1; padding:0.8rem; border-radius:8px; background:rgba(255,255,255,0.1); border:1px solid transparent; color:white; transition:all 0.2s;">Luxury</button>
            </div>
            
            <div id="cabStatus" style="margin-top:1.5rem; min-height:20px; font-size:0.9rem; color: #4ade80;"></div>
          </div>
        </div>
        <button class="submit-btn" onclick="confirmCabBooking()" style="margin-top: 1rem;">Find Driver</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
};

window.selectVehicle = function (btn) {
  document.querySelectorAll('.vehicle-select-btn').forEach(b => {
    b.classList.remove('selected');
    b.style.background = 'rgba(255,255,255,0.1)';
    b.style.border = '1px solid transparent';
    b.style.transform = 'scale(1)';
    b.style.fontWeight = 'normal';
  });
  btn.classList.add('selected');
  btn.style.background = 'var(--primary-gradient)';
  btn.style.border = '1px solid rgba(255,255,255,0.5)';
  btn.style.transform = 'scale(1.05)';
  btn.style.fontWeight = 'bold';
};

window.confirmCabBooking = function () {
  const statusDiv = document.getElementById('cabStatus');
  const btn = document.querySelector('#cabModal .submit-btn');
  const destination = document.getElementById('cabDestination').value;
  const vehicle = document.querySelector('.vehicle-select-btn.selected').innerText.trim();

  // Vehicle Details Mapping
  const vehicleDetails = {
    'Sedan': { model: 'Toyota Etios', plate: 'WB-02-AK-1234', time: '3 mins' },
    'SUV': { model: 'Toyota Innova Crysta', plate: 'WB-06-L-9876', time: '5 mins' },
    'Luxury': { model: 'Mercedes E-Class', plate: 'WB-01-LUX-0001', time: '8 mins' }
  };

  const details = vehicleDetails[vehicle] || vehicleDetails['Sedan'];

  btn.disabled = true;
  btn.innerText = "Searching nearby drivers...";
  btn.style.opacity = "0.7";

  // Simulate searching
  let dots = 0;
  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    statusDiv.innerText = "Connecting to nearby drivers" + ".".repeat(dots);
  }, 500);

  setTimeout(() => {
    clearInterval(interval);
    statusDiv.innerHTML = `✅ <b>Driver Found!</b><br>${details.model} (${details.plate})<br>Arriving in ${details.time}`;
    statusDiv.style.color = "#4ade80";
    btn.innerText = "Ride Confirmed";
    btn.onclick = function () { returnToChatbot(); };
    btn.disabled = false;
    btn.style.opacity = "1";

    // Add to bookings
    window.addServiceRequest('Transport', `Cab to ${destination} (${vehicle}). Confirmed.`);
  }, 2500);
};

// Request Valet
window.requestValet = function () {
  const confirmHTML = `
    <div class="page-form-overlay">
      <div class="page-form-container">
        <div class="confirmation-card">
          <h3>🔑 Valet Request Received</h3>
          <p style="margin-top: 1rem; font-size: 1.1rem;">
            Your vehicle is being retrieved from the parking lot.
          </p>
          <p style="margin-top: 0.5rem; color: var(--text-secondary);">
            Please wait at the hotel porch. It will be ready in 5 minutes.
          </p>
        </div>
        <button class="submit-btn" onclick="returnToChatbot()" style="margin-top: 1rem;">Back to Services</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', confirmHTML);
  window.addServiceRequest('Valet Service', 'Vehicle retrieval requested. Ready in 5 mins.');
};

// Join Gym Class
window.joinGymClass = function (btn, className, icon) {
  // Visual Feedback
  if (btn) {
    btn.innerHTML = 'Joined ✓';
    btn.style.background = '#4ade80';
    btn.style.color = '#000';
    btn.disabled = true;
    btn.style.cursor = 'default';
  }

  showConciergeToast('Class Joined', `You are booked for ${className}`, icon);
  window.addServiceRequest('Gym Class', `Booked for ${className}`);
};

// Book Concierge Item
window.bookConciergeItem = function (item, type, title, msg, icon) {
  showConciergeToast(title, msg, icon);
  window.addServiceRequest(type, `Booking confirmed for ${item}`);
};

// Show bookings page
function showBookingsPage() {
  const app = document.querySelector('#app');

  let bookingsHTML = '';

  if (bookingsHistory.length === 0) {
    bookingsHTML = `
      <div class="no-bookings">
        <div class="no-bookings-icon">📋</div>
        <h3>No Bookings Yet</h3>
        <p>You haven't made any service requests or bookings yet.</p>
      </div>
    `;
  } else {
    // Sort by timestamp (newest first)
    const sortedBookings = [...bookingsHistory].sort((a, b) =>
      new Date(b.timestamp) - new Date(a.timestamp)
    );

    bookingsHTML = sortedBookings.map((booking, index) => {
      // Find the original index in bookingsHistory
      const originalIndex = bookingsHistory.findIndex(b =>
        b.reference === booking.reference && b.timestamp === booking.timestamp
      );
      const date = new Date(booking.timestamp);
      const formattedDate = date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      if (booking.type === 'booking') {
        return `
          <div class="booking-card">
            <div class="booking-header">
              <span class="booking-type-badge booking-badge">🎫 Booking</span>
              <span class="booking-ref">${booking.reference}</span>
            </div>
            <h3>${booking.service}</h3>
            <div class="booking-details">
              <div class="detail-row">
                <span class="detail-label">Room:</span>
                <span class="detail-value">${booking.room}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">People:</span>
                <span class="detail-value">${booking.people}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${booking.date}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${booking.time}</span>
              </div>
            </div>
            <div class="booking-footer">
              <span class="booking-timestamp">Booked on ${formattedDate}</span>
              <button class="cancel-booking-btn" onclick="cancelBooking('${booking.reference}')">Cancel</button>
            </div>
          </div>
        `;
      } else if (booking.type === 'order') {
        const itemsList = booking.items.map(item =>
          `<div class="order-item-mini">${item.name} - ₹${item.price}</div>`
        ).join('');

        return `
          <div class="booking-card">
            <div class="booking-header">
              <span class="booking-type-badge order-badge">🍽️ Order</span>
              <span class="booking-ref">${booking.reference}</span>
            </div>
            <h3>${booking.service}</h3>
            <div class="booking-details">
              <div class="order-items-mini">
                ${itemsList}
              </div>
              <div class="detail-row total-row">
                <span class="detail-label">Total:</span>
                <span class="detail-value">₹${booking.total}</span>
              </div>
            </div>
            <div class="booking-footer">
              <span class="booking-timestamp">Ordered on ${formattedDate}</span>
              <button class="cancel-booking-btn" onclick="cancelBooking('${booking.reference}')">Cancel</button>
            </div>
          </div>
        `;
      } else if (booking.type === 'feedback') {
        return `
          <div class="booking-card">
            <div class="booking-header">
              <span class="booking-type-badge feedback-badge">💬 Feedback</span>
              <span class="booking-ref">${booking.reference}</span>
            </div>
            <h3>Customer Feedback</h3>
            <div class="booking-details">
              <div class="feedback-text">"${booking.feedback}"</div>
            </div>
            <div class="booking-footer">
              <span class="booking-timestamp">Submitted on ${formattedDate}</span>
              <button class="cancel-booking-btn" onclick="cancelBooking('${booking.reference}')">Cancel</button>
            </div>
          </div>
        `;
      } else if (booking.type === 'service_request') {
        return `
          <div class="booking-card">
            <div class="booking-header">
              <span class="booking-type-badge feedback-badge">🔔 Request</span>
              <span class="booking-ref">${booking.reference}</span>
            </div>
            <h3>${booking.service}</h3>
            <div class="booking-details">
              <div class="feedback-text">${booking.details}</div>
            </div>
            <div class="booking-footer">
              <span class="booking-timestamp">Requested on ${formattedDate}</span>
              <button class="cancel-booking-btn" onclick="cancelBooking('${booking.reference}')">Cancel</button>
            </div>
          </div>
        `;
      }
    }).join('');
  }

  app.innerHTML = `
    <div class="service-page">
      <div class="service-page-header">
        <button class="back-btn" onclick="returnToChatbot()">
          <span>←</span> Back to Services
        </button>
      </div>
      
      <div class="service-page-content">
        <div class="service-icon-large">📋</div>
        <h1 class="service-title">My Bookings & Requests</h1>
        <p class="service-description">View all your service requests, bookings, and orders</p>
        
        <div class="bookings-container">
          ${bookingsHTML}
        </div>
      </div>
    </div>
  `;
}

// Cancel a booking by reference
window.cancelBooking = function (reference) {
  console.log('Cancel booking called with reference:', reference);
  console.log('Bookings history length:', bookingsHistory.length);
  console.log('Bookings history:', bookingsHistory);

  // Find the booking by reference
  const index = bookingsHistory.findIndex(b => b.reference === reference);

  if (index === -1) {
    console.error('Booking not found with reference:', reference);
    alert('Unable to cancel booking. Please refresh the page and try again.');
    return;
  }

  const booking = bookingsHistory[index];
  console.log('Booking to cancel:', booking);

  const serviceName = booking.service || booking.type || 'service';

  // Create custom confirmation dialog
  const confirmHTML = `
    <div class="page-form-overlay" style="z-index: 10000 !important; display: flex !important;">
      <div class="page-form-container" style="max-width: 400px; z-index: 10001 !important;">
        <div class="confirmation-card">
          <h3>⚠️ Cancel ${serviceName}?</h3>
          <p style="margin: 1rem 0; color: var(--text-secondary);">
            Are you sure you want to cancel this ${serviceName}?
          </p>
          <p style="margin: 0.5rem 0; font-family: 'Courier New', monospace; color: var(--text-primary);">
            Reference: ${booking.reference || 'N/A'}
          </p>
        </div>
        <div class="form-actions" style="margin-top: 1rem;">
          <button class="submit-btn" onclick="confirmCancelBooking(${index})" style="background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);">Yes, Cancel It</button>
          <button class="cancel-btn" onclick="closeConfirmDialog()">No, Keep It</button>
        </div>
      </div>
    </div>
  `;

  console.log('Creating confirmation dialog...');
  document.body.insertAdjacentHTML('beforeend', confirmHTML);
  console.log('Confirmation dialog added to DOM');

  // Verify it was added
  const overlays = document.querySelectorAll('.page-form-overlay');
  console.log('Total overlays in DOM:', overlays.length);
};

// Confirm the cancellation
window.confirmCancelBooking = function (index) {
  console.log('Deleting booking at index:', index);

  // Remove the booking from history
  bookingsHistory.splice(index, 1);
  console.log('Booking cancelled. Remaining bookings:', bookingsHistory.length);
  console.log('Updated bookings history:', bookingsHistory);

  // Close the confirmation dialog
  closeConfirmDialog();

  // Refresh the bookings page
  console.log('Refreshing bookings page...');
  showBookingsPage();
  console.log('Bookings page refreshed');
};

// Close confirmation dialog
window.closeConfirmDialog = function () {
  const overlays = document.querySelectorAll('.page-form-overlay');
  overlays.forEach(overlay => overlay.remove());
};


// Show booking form on service page
window.showBookingFormOnPage = function (service) {
  const serviceNames = { 'spa': 'Spa', 'restaurant': 'Restaurant' };
  const today = new Date().toISOString().split('T')[0];

  const formHTML = `
    <div class="page-form-overlay">
      <div class="page-form-container">
        <h2>Book ${serviceNames[service]}</h2>
        <div class="booking-form">
          <div class="form-group">
            <label>Room Number</label>
            <input type="text" id="roomNumber" placeholder="Enter your room number" required>
          </div>
          <div class="form-group">
            <label>Number of People</label>
            <select id="numPeople" required>
              ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1} ${i === 0 ? 'Person' : 'People'}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label>Date</label>
            <input type="date" id="bookingDate" min="${today}" required>
          </div>
          <div class="form-group">
            <label>Time</label>
            <input type="time" id="bookingTime" required>
          </div>
          <div class="form-actions">
            <button class="submit-btn" onclick="submitBookingOnPage('${service}')">Confirm Booking</button>
            <button class="cancel-btn" onclick="closePageForm()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', formHTML);
};

// Submit booking from service page
window.submitBookingOnPage = function (service) {
  const roomNumber = document.getElementById('roomNumber').value.trim();
  const numPeople = document.getElementById('numPeople').value;
  const bookingDate = document.getElementById('bookingDate').value;
  const bookingTime = document.getElementById('bookingTime').value;

  if (!roomNumber || !numPeople || !bookingDate || !bookingTime) {
    alert('Please fill in all required fields');
    return;
  }

  const bookingRef = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();

  // Save booking to history
  bookingsHistory.push({
    type: 'booking',
    service: service === 'spa' ? 'Spa' : 'Restaurant',
    reference: bookingRef,
    room: roomNumber,
    people: numPeople,
    date: bookingDate,
    time: bookingTime,
    timestamp: new Date().toISOString()
  });

  closePageForm();

  const confirmHTML = `
    <div class="page-form-overlay">
      <div class="page-form-container">
        <div class="confirmation-card">
          <h3>✅ Booking Confirmed!</h3>
          <div class="confirmation-details">
            <p><strong>Booking Reference:</strong> <span>${bookingRef}</span></p>
            <p><strong>Service:</strong> <span>${service === 'spa' ? 'Spa' : 'Restaurant'}</span></p>
            <p><strong>Room:</strong> <span>${roomNumber}</span></p>
            <p><strong>People:</strong> <span>${numPeople}</span></p>
            <p><strong>Date:</strong> <span>${bookingDate}</span></p>
            <p><strong>Time:</strong> <span>${bookingTime}</span></p>
          </div>
        </div>
        <button class="submit-btn" onclick="returnToChatbot()" style="margin-top: 1rem;">Back to Services</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', confirmHTML);
};

// Show menu on service page
window.showMenuOnPage = function () {
  const menuHTML = `
    <div class="page-form-overlay">
      <div class="page-form-container menu-container">
        <h2>Room Dining Menu</h2>
        <div id="menuContentPage"></div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', menuHTML);
  showMenuInContainer('veg');
};

// Show feedback form on service page
window.showFeedbackFormOnPage = function () {
  const formHTML = `
    <div class="page-form-overlay">
      <div class="page-form-container">
        <h2>Share Your Feedback</h2>
        <div class="booking-form">
          <div class="form-group">
            <label>Your Feedback</label>
            <textarea id="feedbackText" placeholder="Share your experience with us..." rows="6" required></textarea>
          </div>
          <div class="form-actions">
            <button class="submit-btn" onclick="submitFeedbackOnPage()">Submit Feedback</button>
            <button class="cancel-btn" onclick="closePageForm()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', formHTML);
};

// Submit feedback from service page
window.submitFeedbackOnPage = function () {
  const feedback = document.getElementById('feedbackText').value.trim();

  if (!feedback) {
    alert('Please enter your feedback');
    return;
  }

  const feedbackRef = 'FB' + Math.random().toString(36).substr(2, 9).toUpperCase();

  // Save feedback to history
  bookingsHistory.push({
    type: 'feedback',
    service: 'Feedback',
    reference: feedbackRef,
    feedback: feedback,
    timestamp: new Date().toISOString()
  });

  closePageForm();

  const confirmHTML = `
    <div class="page-form-overlay">
      <div class="page-form-container">
        <div class="confirmation-card">
          <h3>✅ Thank You for Your Feedback!</h3>
          <p style="margin-top: 1rem;">We appreciate you taking the time to share your thoughts. Your feedback helps us improve our services.</p>
        </div>
        <button class="submit-btn" onclick="returnToChatbot()" style="margin-top: 1rem;">Back to Services</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', confirmHTML);
};

// Close page form overlay
window.closePageForm = function () {
  const overlay = document.querySelector('.page-form-overlay');
  if (overlay) overlay.remove();
};

// Show menu in container
function showMenuInContainer(type) {
  const vegItems = [
    { id: 1, name: 'Paneer Tikka Masala', description: 'Grilled cottage cheese in creamy sauce', price: 380, type: 'veg' },
    { id: 2, name: 'Dal Makhani', description: 'Creamy black lentils slow-cooked', price: 320, type: 'veg' },
    { id: 3, name: 'Veg Biryani', description: 'Aromatic basmati rice with vegetables', price: 350, type: 'veg' },
    { id: 4, name: 'Masala Dosa', description: 'Crispy rice crepe with potato filling', price: 280, type: 'veg' },
    { id: 5, name: 'Chole Bhature', description: 'Spiced chickpeas with fried bread', price: 300, type: 'veg' },
    { id: 6, name: 'Gulab Jamun', description: 'Sweet milk dumplings in syrup', price: 150, type: 'veg' }
  ];

  const nonVegItems = [
    { id: 7, name: 'Butter Chicken', description: 'Tender chicken in rich tomato gravy', price: 450, type: 'non-veg' },
    { id: 8, name: 'Chicken Biryani', description: 'Aromatic basmati rice with chicken', price: 420, type: 'non-veg' },
    { id: 9, name: 'Tandoori Chicken', description: 'Grilled chicken with spices', price: 400, type: 'non-veg' },
    { id: 10, name: 'Fish Curry', description: 'Fresh fish in coconut curry', price: 480, type: 'non-veg' },
    { id: 11, name: 'Mutton Rogan Josh', description: 'Tender mutton in aromatic gravy', price: 520, type: 'non-veg' },
    { id: 12, name: 'Chicken Tikka', description: 'Grilled chicken pieces', price: 380, type: 'non-veg' }
  ];

  const menuItems = type === 'veg' ? vegItems : nonVegItems;
  const menuItemsHTML = menuItems.map(item => {
    const isInBasket = orderBasket.some(basketItem => basketItem.id === item.id);
    return `
      <div class="menu-item">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-item-footer">
          <div class="price">₹${item.price}</div>
          <label class="basket-checkbox">
            <input type="checkbox" 
              ${isInBasket ? 'checked' : ''} 
              onchange="toggleBasketItemOnPage(${item.id}, '${item.name}', ${item.price}, '${item.type}', this.checked)">
            <span>Add to Basket</span>
          </label>
        </div>
      </div>
    `;
  }).join('');

  const menuContent = document.getElementById('menuContentPage');
  menuContent.innerHTML = `
    <div class="menu-toggle">
      <button class="menu-toggle-btn ${type === 'veg' ? 'active' : ''}" onclick="window.showMenuInContainer('veg')">🥗 Vegetarian</button>
      <button class="menu-toggle-btn ${type === 'non-veg' ? 'active' : ''}" onclick="window.showMenuInContainer('non-veg')">🍗 Non-Vegetarian</button>
    </div>
    <div class="menu-items">${menuItemsHTML}</div>
    <div class="menu-actions">
      <div class="basket-summary" id="basketSummaryPage">
        <strong>Basket:</strong> <span id="basketCountPage">0 items</span> | <span id="basketTotalPage">₹0</span>
      </div>
      <button class="submit-btn" onclick="placeOrderOnPage()" id="placeOrderBtnPage" disabled>Place Order</button>
      <button class="cancel-btn" onclick="closePageForm()">Cancel</button>
    </div>
  `;

  updateBasketSummaryOnPage();
}

// Make showMenuInContainer accessible globally
window.showMenuInContainer = showMenuInContainer;

// Toggle basket item on page
window.toggleBasketItemOnPage = function (id, name, price, type, isChecked) {
  if (isChecked) {
    orderBasket.push({ id, name, price, type });
  } else {
    orderBasket = orderBasket.filter(item => item.id !== id);
  }
  updateBasketSummaryOnPage();
};

// Update basket summary on page
function updateBasketSummaryOnPage() {
  const count = orderBasket.length;
  const total = orderBasket.reduce((sum, item) => sum + item.price, 0);
  const countElem = document.getElementById('basketCountPage');
  const totalElem = document.getElementById('basketTotalPage');
  const btnElem = document.getElementById('placeOrderBtnPage');

  if (countElem) countElem.textContent = `${count} item${count !== 1 ? 's' : ''}`;
  if (totalElem) totalElem.textContent = `₹${total}`;
  if (btnElem) btnElem.disabled = count === 0;
}

// Place order from page - show preview first
window.placeOrderOnPage = function () {
  if (orderBasket.length === 0) return;

  const total = orderBasket.reduce((sum, item) => sum + item.price, 0);
  const itemsList = orderBasket.map((item, index) => `
    <div class="order-preview-item">
      <span class="item-name">${item.name}</span>
      <span class="item-price">₹${item.price}</span>
      <button class="delete-item-btn" onclick="removeItemFromPreview(${index})" title="Remove item">
        ❌
      </button>
    </div>
  `).join('');

  const previewHTML = `
    <div class="page-form-overlay">
      <div class="page-form-container order-preview-container">
        <h2>Review Your Order</h2>
        <div class="order-preview-content">
          <div class="order-preview-header">
            <strong>Items (${orderBasket.length})</strong>
          </div>
          <div class="order-preview-items" id="orderPreviewItems">
            ${itemsList}
          </div>
          <div class="order-preview-total">
            <strong>Total Amount:</strong>
            <span id="previewTotal">₹${total}</span>
          </div>
        </div>
        <div class="form-actions">
          <button class="submit-btn" onclick="confirmOrderPlacement()">Confirm Order</button>
          <button class="cancel-btn" onclick="closeOrderPreview()">Cancel</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', previewHTML);
};

// Remove item from order preview
window.removeItemFromPreview = function (index) {
  orderBasket.splice(index, 1);

  if (orderBasket.length === 0) {
    closeOrderPreview();
    updateBasketSummaryOnPage();
    return;
  }

  // Update preview display
  const total = orderBasket.reduce((sum, item) => sum + item.price, 0);
  const itemsList = orderBasket.map((item, idx) => `
    <div class="order-preview-item">
      <span class="item-name">${item.name}</span>
      <span class="item-price">₹${item.price}</span>
      <button class="delete-item-btn" onclick="removeItemFromPreview(${idx})" title="Remove item">
        ❌
      </button>
    </div>
  `).join('');

  document.getElementById('orderPreviewItems').innerHTML = itemsList;
  document.getElementById('previewTotal').textContent = `₹${total}`;
  document.querySelector('.order-preview-header strong').textContent = `Items (${orderBasket.length})`;

  // Update the menu basket summary too
  updateBasketSummaryOnPage();
};

// Close order preview
window.closeOrderPreview = function () {
  const overlays = document.querySelectorAll('.page-form-overlay');
  if (overlays.length > 1) {
    overlays[overlays.length - 1].remove();
  }
};

// Confirm order placement
window.confirmOrderPlacement = function () {
  if (orderBasket.length === 0) return;

  const orderNumber = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const total = orderBasket.reduce((sum, item) => sum + item.price, 0);
  const itemsList = orderBasket.map(item => `
    <div class="order-item-row">
      <span class="item-name">${item.name}</span>
      <span class="item-price">₹${item.price}</span>
    </div>
  `).join('');

  // Save order to history
  bookingsHistory.push({
    type: 'order',
    service: 'Room Dining',
    reference: orderNumber,
    items: [...orderBasket],
    total: total,
    timestamp: new Date().toISOString()
  });

  // Close preview
  closeOrderPreview();
  // Close menu
  closePageForm();

  const confirmHTML = `
    <div class="page-form-overlay">
      <div class="page-form-container">
        <div class="confirmation-card">
          <h3>✅ Order Placed Successfully!</h3>
          <div class="confirmation-details">
            <p><strong>Order Number:</strong> <span>${orderNumber}</span></p>
            <div class="order-items-section">
              <strong>Items:</strong>
              <div class="order-items-list">${itemsList}</div>
            </div>
            <p><strong>Total Amount:</strong> <span>₹${total}</span></p>
          </div>
        </div>
        <p style="margin-top: 1rem;">Your order will be delivered to your room shortly.</p>
        <button class="submit-btn" onclick="returnToChatbot()" style="margin-top: 1rem;">Back to Services</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', confirmHTML);
  orderBasket = [];
};

// Show menu selection (Veg/Non-Veg)
function showMenuSelection() {
  const selectionHTML = `
    <div class="menu-selection">
      <button class="menu-type-btn" onclick="showMenu('veg')">
        <span>🥗 Vegetarian Menu</span>
      </button>
      <button class="menu-type-btn" onclick="showMenu('non-veg')">
        <span>🍗 Non-Vegetarian Menu</span>
      </button>
    </div>
  `;

  addBotMessage(selectionHTML);
}

// Show menu
window.showMenu = function (type) {
  if (!menuOverlay.classList.contains('active')) {
    addUserMessage(type === 'veg' ? 'Show Vegetarian Menu' : 'Show Non-Vegetarian Menu');
  }

  const vegItems = [
    { id: 1, name: 'Paneer Tikka Masala', description: 'Grilled cottage cheese in creamy sauce', price: 380, type: 'veg' },
    { id: 2, name: 'Dal Makhani', description: 'Creamy black lentils slow-cooked', price: 320, type: 'veg' },
    { id: 3, name: 'Veg Biryani', description: 'Aromatic basmati rice with vegetables', price: 350, type: 'veg' },
    { id: 4, name: 'Masala Dosa', description: 'Crispy rice crepe with potato filling', price: 280, type: 'veg' },
    { id: 5, name: 'Chole Bhature', description: 'Spiced chickpeas with fried bread', price: 300, type: 'veg' },
    { id: 6, name: 'Gulab Jamun', description: 'Sweet milk dumplings in syrup', price: 150, type: 'veg' }
  ];

  const nonVegItems = [
    { id: 7, name: 'Butter Chicken', description: 'Tender chicken in rich tomato gravy', price: 450, type: 'non-veg' },
    { id: 8, name: 'Chicken Biryani', description: 'Aromatic basmati rice with chicken', price: 420, type: 'non-veg' },
    { id: 9, name: 'Tandoori Chicken', description: 'Grilled chicken with spices', price: 400, type: 'non-veg' },
    { id: 10, name: 'Fish Curry', description: 'Fresh fish in coconut curry', price: 480, type: 'non-veg' },
    { id: 11, name: 'Mutton Rogan Josh', description: 'Tender mutton in aromatic gravy', price: 520, type: 'non-veg' },
    { id: 12, name: 'Chicken Tikka', description: 'Grilled chicken pieces', price: 380, type: 'non-veg' }
  ];

  const menuItems = type === 'veg' ? vegItems : nonVegItems;

  const menuItemsHTML = menuItems.map(item => {
    const isInBasket = orderBasket.some(basketItem => basketItem.id === item.id);
    return `
      <div class="menu-item">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-item-footer">
          <div class="price">₹${item.price}</div>
          <label class="basket-checkbox">
            <input type="checkbox" 
              ${isInBasket ? 'checked' : ''} 
              onchange="toggleBasketItem(${item.id}, '${item.name}', ${item.price}, '${item.type}', this.checked)">
            <span>Add to Basket</span>
          </label>
        </div>
      </div>
    `;
  }).join('');

  const menuContent = document.getElementById('menuContent');
  menuContent.innerHTML = `
    <div class="menu-toggle">
      <button class="menu-toggle-btn ${type === 'veg' ? 'active' : ''}" onclick="showMenu('veg')">
        🥗 Vegetarian
      </button>
      <button class="menu-toggle-btn ${type === 'non-veg' ? 'active' : ''}" onclick="showMenu('non-veg')">
        🍗 Non-Vegetarian
      </button>
    </div>
    <div class="menu-items">${menuItemsHTML}</div>
    <div class="menu-actions">
      <div class="basket-summary" id="basketSummary">
        <strong>Basket:</strong> <span id="basketCount">0 items</span> | <span id="basketTotal">₹0</span>
      </div>
      <button class="submit-btn" onclick="placeOrder()" id="placeOrderBtn" disabled>Place Order</button>
      <button class="cancel-btn" onclick="closeMenu()">Cancel</button>
    </div>
  `;

  menuOverlay.classList.add('active');
  updateBasketSummary();
};

// Toggle basket item
window.toggleBasketItem = function (id, name, price, type, isChecked) {
  if (isChecked) {
    orderBasket.push({ id, name, price, type });
  } else {
    orderBasket = orderBasket.filter(item => item.id !== id);
  }
  updateBasketSummary();
};

// Update basket summary
function updateBasketSummary() {
  const count = orderBasket.length;
  const total = orderBasket.reduce((sum, item) => sum + item.price, 0);

  document.getElementById('basketCount').textContent = `${count} item${count !== 1 ? 's' : ''}`;
  document.getElementById('basketTotal').textContent = `₹${total}`;
  document.getElementById('placeOrderBtn').disabled = count === 0;
}

// Place order
window.placeOrder = function () {
  if (orderBasket.length === 0) return;

  const orderNumber = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const total = orderBasket.reduce((sum, item) => sum + item.price, 0);
  const itemsList = orderBasket.map(item => `
    <div class="order-item-row">
      <span class="item-name">${item.name}</span>
      <span class="item-price">₹${item.price}</span>
    </div>
  `).join('');

  menuOverlay.classList.remove('active');

  setTimeout(() => {
    const confirmationHTML = `
      <div class="confirmation-card">
        <h3>✅ Order Placed Successfully!</h3>
        <div class="confirmation-details">
          <p><strong>Order Number:</strong> <span>${orderNumber}</span></p>
          <div class="order-items-section">
            <strong>Items:</strong>
            <div class="order-items-list">${itemsList}</div>
          </div>
          <p><strong>Total Amount:</strong> <span>₹${total}</span></p>
        </div>
      </div>
      <p style="margin-top: 1rem;">Your order will be delivered to your room shortly. Is there anything else I can help you with?</p>
    `;

    addBotMessage(confirmationHTML, true);
    orderBasket = [];
  }, 500);
};

// Close menu
window.closeMenu = function () {
  menuOverlay.classList.remove('active');
  orderBasket = [];
  setTimeout(() => {
    addBotMessage('Would you like to explore other services?', true);
  }, 500);
};

// Show booking form
function showBookingForm(service) {
  const serviceNames = {
    'spa': 'Spa',
    'restaurant': 'Restaurant'
  };

  const formHTML = `
    <div class="booking-form">
      <div class="form-group">
        <label>Room Number *</label>
        <input type="text" id="roomNumber" placeholder="e.g., 305" required />
      </div>
      <div class="form-group">
        <label>Number of People *</label>
        <input type="number" id="numPeople" min="1" max="10" placeholder="e.g., 2" required />
      </div>
      <div class="form-group">
        <label>Date *</label>
        <input type="date" id="bookingDate" min="${new Date().toISOString().split('T')[0]}" required />
      </div>
      <div class="form-group">
        <label>Time *</label>
        <input type="time" id="bookingTime" required />
      </div>
      <div class="form-actions">
        <button class="submit-btn" onclick="submitBooking('${service}')">Confirm Booking</button>
        <button class="cancel-btn" onclick="cancelBooking()">Cancel</button>
      </div>
    </div>
  `;

  addBotMessage(`Perfect! Please provide the following details for your ${serviceNames[service]} booking:${formHTML}`);
}

// Submit booking
window.submitBooking = function (service) {
  const roomNumber = document.getElementById('roomNumber').value.trim();
  const numPeople = document.getElementById('numPeople').value;
  const bookingDate = document.getElementById('bookingDate').value;
  const bookingTime = document.getElementById('bookingTime').value;

  if (!roomNumber || !numPeople || !bookingDate || !bookingTime) {
    alert('Please fill in all required fields');
    return;
  }

  const referenceNumber = 'BKG' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const serviceName = service === 'spa' ? 'Spa' : 'Restaurant';

  const confirmationHTML = `
    <div class="confirmation-card">
      <h3>✅ Booking Confirmed!</h3>
      <div class="confirmation-details">
        <p><strong>Reference:</strong> <span>${referenceNumber}</span></p>
        <p><strong>Service:</strong> <span>${serviceName}</span></p>
        <p><strong>Room:</strong> <span>${roomNumber}</span></p>
        <p><strong>People:</strong> <span>${numPeople}</span></p>
        <p><strong>Date:</strong> <span>${bookingDate}</span></p>
        <p><strong>Time:</strong> <span>${bookingTime}</span></p>
      </div>
    </div>
    <p style="margin-top: 1rem;">Your booking has been confirmed. We look forward to serving you! Is there anything else I can help you with?</p>
  `;

  addBotMessage(confirmationHTML, true);
};

// Cancel booking
window.cancelBooking = function () {
  addBotMessage('Booking cancelled. Would you like to explore other services?', true);
};

// Show feedback form
function showFeedbackForm() {
  const formHTML = `
    <div class="booking-form">
      <div class="form-group">
        <label>Your Feedback</label>
        <textarea id="feedbackText" placeholder="Share your experience with us..." rows="5" required></textarea>
      </div>
      <div class="form-actions">
        <button class="submit-btn" onclick="submitFeedback()">Submit Feedback</button>
        <button class="cancel-btn" onclick="cancelFeedback()">Cancel</button>
      </div>
    </div>
  `;

  addBotMessage(`We value your feedback! Please share your thoughts:${formHTML}`);
}

// Submit feedback
window.submitFeedback = function () {
  const feedbackText = document.getElementById('feedbackText').value.trim();

  if (!feedbackText) {
    alert('Please enter your feedback');
    return;
  }

  addBotMessage('Thank you for your valuable feedback! We truly appreciate your input and will use it to improve our services. 🌟', true);
};

// Cancel feedback
window.cancelFeedback = function () {
  addBotMessage('No problem! Would you like to explore other services?', true);
};

// Scroll to bottom
function scrollToBottom() {
  const messagesContainer = document.getElementById('messages');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


// Launch Concierge AI App
window.showConciergeApp = function () {
  const appHTML = `
    <div class="concierge-app-overlay" id="conciergeApp">
      <div class="concierge-header">
        <div class="concierge-brand">
          <div class="concierge-logo-box">✨</div>
          <h2>Concierge AI</h2>
        </div>
        <button class="concierge-close-btn" onclick="closeConciergeApp()">✕</button>
      </div>
      
      <div class="concierge-content" id="conciergeContent">
        <div class="concierge-hero">
          <h1>How can I enhance your stay?</h1>
          <p>I can plan your day, book tickets, or find the best local experiences instantly.</p>
        </div>
        
        <div class="concierge-grid">
          <div class="concierge-card" onclick="generateConciergeResponse('attractions')">
            <div class="card-icon">🎡</div>
            <h3>Local Attractions</h3>
            <p>Discover top-rated sights nearby with personalized recommendations.</p>
          </div>
          
          <div class="concierge-card" onclick="generateConciergeResponse('events')">
            <div class="card-icon">🎟️</div>
            <h3>Event Tickets</h3>
            <p>Find and book tickets for concerts, shows, and local events.</p>
          </div>
          
          <div class="concierge-card" onclick="generateConciergeResponse('tours')">
            <div class="card-icon">🗺️</div>
            <h3>Tour Arrangements</h3>
            <p>Guided city tours, food walks, and adventure packages.</p>
          </div>
          
          <div class="concierge-card" onclick="generateConciergeResponse('travel')">
            <div class="card-icon">📅</div>
            <h3>Travel Planning</h3>
            <p>Get a day-by-day itinerary crafted just for you.</p>
          </div>
          
          <div class="concierge-card" onclick="generateConciergeResponse('special')">
            <div class="card-icon">💎</div>
            <h3>Special Requests</h3>
            <p>Celebrations, surprises, or specific requirements.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', appHTML);
};

// Close Concierge App
window.closeConciergeApp = function () {
  const app = document.getElementById('conciergeApp');
  if (app) {
    app.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => app.remove(), 300);
  }
};

// Generate AI Response
window.generateConciergeResponse = function (type) {
  const contentDiv = document.getElementById('conciergeContent');

  // limit simulated waiting time
  const waitTime = 1500 + Math.random() * 1000;

  // Show loading state
  contentDiv.innerHTML = `
    <div class="ai-generating">
      <div class="ai-orb"></div>
      <div class="generating-text">
        AI is curating your ${type === 'travel' ? 'itinerary' : 'options'}
        <span class="typing-dot">.</span><span class="typing-dot">.</span><span class="typing-dot">.</span>
      </div>
    </div>
  `;

  setTimeout(() => {
    let resultHTML = '';

    if (type === 'attractions') {
      resultHTML = `
        <div class="ai-results">
          <div class="results-header">
            <button class="back-to-menu-btn" onclick="resetConciergeApp()">← Back</button>
            <h2>Top Nearby Attractions</h2>
            <p>Based on your location and popular ratings</p>
          </div>
          <div class="results-grid">
            <div class="result-card">
              <div class="result-image" style="background-image: url('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=600');">
                <span class="result-tag">4.8 ★</span>
              </div>
              <div class="result-content">
                <h3>City Central Park</h3>
                <div class="result-meta"><span>1.2 km away</span><span>Nature</span></div>
                <p>Beautiful landscapes, walking trails, and a peaceful lake in the city heart.</p>
                <button class="result-btn" onclick="showConciergeToast('Directions Sent', 'Map link and directions sent to your phone.', '📍')">Get Directions</button>
              </div>
            </div>
            <div class="result-card">
              <div class="result-image" style="background-image: url('https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=600');">
                <span class="result-tag">4.9 ★</span>
              </div>
              <div class="result-content">
                <h3>Royal Art Museum</h3>
                <div class="result-meta"><span>2.5 km away</span><span>Culture</span></div>
                <p>Home to ancient artifacts and modern masterpieces. Guided tours available.</p>
                <button class="result-btn" onclick="bookConciergeItem('Royal Art Museum', 'Attraction Ticket', 'Info Sent', 'Ticket details have been emailed to you.', '🎟️')">Buy Tickets</button>
              </div>
            </div>
            <div class="result-card">
              <div class="result-image" style="background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600');">
                <span class="result-tag">4.7 ★</span>
              </div>
              <div class="result-content">
                <h3>Skyline Viewpoint</h3>
                <div class="result-meta"><span>3.0 km away</span><span>Sightseeing</span></div>
                <p>Panoramic views of the entire city. Best visited during sunset.</p>
                <button class="result-btn" onclick="showConciergeToast('Saved', 'Location added to your wishlist.', '❤️')">Save Location</button>
              </div>
            </div>
            <div class="result-card">
              <div class="result-image" style="background-image: url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=600');">
                 <span class="result-tag">4.6 ★</span>
              </div>
              <div class="result-content">
                <h3>Historic Old Fort</h3>
                <div class="result-meta"><span>4.2 km away</span><span>History</span></div>
                <p>A 16th-century fortress offering guided heritage walks and light shows.</p>
                <button class="result-btn" onclick="showConciergeToast('Details Sent', 'Brochure and timings sent to your chat.', '🏰')">View Details</button>
              </div>
            </div>
            <div class="result-card">
              <div class="result-image" style="background-image: url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600');">
                 <span class="result-tag">4.8 ★</span>
              </div>
              <div class="result-content">
                <h3>Grand Botanical Garden</h3>
                <div class="result-meta"><span>5.0 km away</span><span>Nature</span></div>
                <p>Exotic plants, butterfly conservatory, and serene walking paths.</p>
                <button class="result-btn" onclick="showConciergeToast('Map Sent', 'Park map sent to your phone.', '🌺')">Get Map</button>
              </div>
            </div>
             <div class="result-card">
              <div class="result-image" style="background-image: url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600');">
                 <span class="result-tag">4.7 ★</span>
              </div>
              <div class="result-content">
                <h3>Science City</h3>
                <div class="result-meta"><span>6.5 km away</span><span>Edutainment</span></div>
                <p>Interactive science exhibits, space theatre, and 3D shows for all ages.</p>
                <button class="result-btn" onclick="bookConciergeItem('Science City', 'Attraction Ticket', 'Tickets', 'Ticket booking link sent.', '🚀')">Book Entry</button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'events') {
      resultHTML = `
        <div class="ai-results">
          <div class="results-header">
             <button class="back-to-menu-btn" onclick="resetConciergeApp()">← Back</button>
            <h2>Happening Tonight</h2>
            <p>Exclusive events near you</p>
          </div>
          <div class="results-grid">
            <div class="result-card">
              <div class="result-image" style="background-image: url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600');">

                <span class="result-tag">Tonight 8pm</span>
              </div>
              <div class="result-content">
                <h3>Jazz Night at The Blue Note</h3>
                <div class="result-meta"><span>Live Music</span><span>₹1000</span></div>
                <p>Smooth jazz performance by the famous Quartet.</p>
                <button class="result-btn" onclick="bookConciergeItem('Jazz Night', 'Event Reservation', 'Request Sent', 'Your reservation request is being processed.', '📨')">Book Table</button>
              </div>
            </div>
             <div class="result-card">
              <div class="result-image" style="background-image: url('https://images.unsplash.com/photo-1507924538820-ede94a04019d?auto=format&fit=crop&q=80&w=600');">

                <span class="result-tag">Tomorrow 7pm</span>
              </div>
              <div class="result-content">
                <h3>Grand Theatre Show</h3>
                <div class="result-meta"><span>Theatre</span><span>₹799</span></div>
                <p>Award-winning play "The Midnight Mystery".</p>
                <button class="result-btn" onclick="showConciergeToast('Checking...', 'Verifying availability for your date.', '⏳')">Check Availability</button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'tours') {
      resultHTML = `
        <div class="ai-results">
          <div class="results-header">
            <button class="back-to-menu-btn" onclick="resetConciergeApp()">← Back</button>
            <h2>Curated Tours</h2>
            <p>Explore the city like a local</p>
          </div>
          <div class="results-grid">
            <div class="result-card">
              <div class="result-image" style="background-image: url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600');">

                <span class="result-tag">4 Hours</span>
              </div>
              <div class="result-content">
                <h3>Heritage Walk</h3>
                <div class="result-meta"><span>Walking</span><span>Free Snacks</span></div>
                <p>Walk through the historic district with an expert guide.</p>
                <button class="result-btn" onclick="bookConciergeItem('Heritage Walk', 'City Tour', 'Booked!', 'Your tour spot is confirmed.', '✅')">Book Tour</button>
              </div>
            </div>
            <div class="result-card">
              <div class="result-image" style="background-image: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600');">

                <span class="result-tag">3 Hours</span>
              </div>
              <div class="result-content">
                <h3>Street Food Safari</h3>
                <div class="result-meta"><span>Foodie</span><span>All Included</span></div>
                <p>Taste the best local delicacies and hidden gems.</p>
                <button class="result-btn" onclick="bookConciergeItem('Street Food Safari', 'City Tour', 'Confirmed', 'Bon Appétit! You are on the guest list.', '🍽️')">Join Group</button>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'travel') {
      resultHTML = `
        <div class="ai-results">
          <div class="results-header">
            <button class="back-to-menu-btn" onclick="resetConciergeApp()">← Back</button>
            <h2>3-Day Itinerary</h2>
            <p>Optimized for culture and relaxation</p>
          </div>
           <div style="color: #fff; background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem;">
              <h3 style="margin-bottom:1rem; color:#4facfe;">Day 1: City Pulse</h3>
              <ul style="line-height: 1.8; opacity: 0.9; margin-left: 1rem;">
                <li>09:00 AM - Breakfast at The Old Bakery</li>
                <li>10:30 AM - Visit National Museum</li>
                <li>01:00 PM - Lunch at River View</li>
                <li>04:00 PM - Boat ride on the lake</li>
                <li>07:00 PM - Dinner at Rooftop Skybar</li>
              </ul>
           </div>
           
           <div style="color: #fff; background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem;">
              <h3 style="margin-bottom:1rem; color:#00f2fe;">Day 2: Nature & shopping</h3>
              <ul style="line-height: 1.8; opacity: 0.9; margin-left: 1rem;">
                 <li>08:00 AM - Morning Yoga in the Park</li>
                 <li>11:00 AM - Shopping at the High Street</li>
                 <li>02:00 PM - Spa Session at Hotel</li>
                 <li>06:00 PM - Cultural Dance Show</li>
                 <li>08:30 PM - Fine Dining Experience</li>
              </ul>
           </div>

           <div style="color: #fff; background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px;">
              <h3 style="margin-bottom:1rem; color:#a5b4fc;">Day 3: Relaxation & Departure</h3>
              <ul style="line-height: 1.8; opacity: 0.9; margin-left: 1rem;">
                 <li>09:30 AM - Late Breakfast at The Garden</li>
                 <li>11:00 AM - Souvenir Shopping</li>
                 <li>01:00 PM - Farewell Lunch</li>
                 <li>03:00 PM - Airport Transfer</li>
              </ul>
           </div>
           <button class="result-btn" style="margin-top:1.5rem;" onclick="showConciergeToast('Itinerary Saved', 'Your 3-day plan has been downloaded.', '📱')">Save Itinerary</button>
        </div>
      `;
    } else {
      resultHTML = `
        <div class="ai-results">
           <div class="results-header">
            <button class="back-to-menu-btn" onclick="resetConciergeApp()">← Back</button>
            <h2>Special Requests</h2>
            <p>Tell us what you need</p>
          </div>
       
          <div style="max-width: 600px; margin: 0 auto;">
             <textarea style="width:100%; padding:1rem; border-radius:12px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; min-height:150px; font-family:inherit;" placeholder="Describe your special request, surprise plan, or specific requirements here..."></textarea>
             <button class="result-btn" style="margin-top:1rem; background: linear-gradient(135deg, #00c6ff, #0072ff); border:none;" onclick="showConciergeToast('Priority Request', 'Head Concierge has received your request.', '🛎️')">Send Priority Request</button>
          </div>
        </div>
      `;
    }

    contentDiv.innerHTML = resultHTML;
  }, waitTime);
};

// Custom Toast Notification
window.showConciergeToast = function (title, message, icon = '✨') {
  // Remove existing toast if any
  const existingToast = document.querySelector('.concierge-toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toastHTML = `
    <div class="concierge-toast">
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', toastHTML);

  // Animate in
  setTimeout(() => {
    const toast = document.querySelector('.concierge-toast');
    if (toast) toast.classList.add('show');
  }, 10);

  // Auto dismiss
  setTimeout(() => {
    const toast = document.querySelector('.concierge-toast');
    if (toast) {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }
  }, 4000);
};

// Reset Concierge App to Home
window.resetConciergeApp = function () {
  const contentDiv = document.getElementById('conciergeContent');
  // Re-inject original grid content
  contentDiv.innerHTML = `
    <div class="concierge-hero">
      <h1>How can I enhance your stay?</h1>
      <p>I can plan your day, book tickets, or find the best local experiences instantly.</p>
    </div>
    
    <div class="concierge-grid">
      <div class="concierge-card" onclick="generateConciergeResponse('attractions')">
        <div class="card-icon">🎡</div>
        <h3>Local Attractions</h3>
        <p>Discover top-rated sights nearby with personalized recommendations.</p>
      </div>
      
      <div class="concierge-card" onclick="generateConciergeResponse('events')">
        <div class="card-icon">🎟️</div>
        <h3>Event Tickets</h3>
        <p>Find and book tickets for concerts, shows, and local events.</p>
      </div>
      
      <div class="concierge-card" onclick="generateConciergeResponse('tours')">
        <div class="card-icon">🗺️</div>
        <h3>Tour Arrangements</h3>
        <p>Guided city tours, food walks, and adventure packages.</p>
      </div>
      
      <div class="concierge-card" onclick="generateConciergeResponse('travel')">
        <div class="card-icon">📅</div>
        <h3>Travel Planning</h3>
        <p>Get a day-by-day itinerary crafted just for you.</p>
      </div>
      
      <div class="concierge-card" onclick="generateConciergeResponse('special')">
        <div class="card-icon">💎</div>
        <h3>Special Requests</h3>
        <p>Celebrations, surprises, or specific requirements.</p>
      </div>
    </div>
  `;
};

// Reset Concierge App to Main Menu
window.resetConciergeApp = function () {
  const contentDiv = document.getElementById('conciergeContent');
  contentDiv.innerHTML = `
    <div class="concierge-header">
      <h2>How can I help you today?</h2>
      <p>Select a category to get started</p>
    </div>
    <div class="concierge-grid">
      <div class="concierge-card" onclick="generateConciergeResponse('attractions')">
        <div class="card-icon">🎡</div>
        <h3>Local Attractions</h3>
        <p>Discover top-rated tourists spots nearby.</p>
      </div>
      <div class="concierge-card" onclick="generateConciergeResponse('events')">
        <div class="card-icon">🎭</div>
        <h3>Events & Shows</h3>
        <p>Concerts, theater, and local happenings.</p>
      </div>
      <div class="concierge-card" onclick="generateConciergeResponse('tours')">
        <div class="card-icon">🚶</div>
        <h3>Tour Arrangements</h3>
        <p>Guided city tours, food walks, and adventure packages.</p>
      </div>
      <div class="concierge-card" onclick="generateConciergeResponse('travel')">
        <div class="card-icon">📅</div>
        <h3>Travel Planning</h3>
        <p>Get a day-by-day itinerary crafted just for you.</p>
      </div>
      <div class="concierge-card" onclick="generateConciergeResponse('special')">
        <div class="card-icon">💎</div>
        <h3>Special Requests</h3>
        <p>Celebrations, surprises, or specific requirements.</p>
      </div>
    </div>
  `;
};

// Show Concierge Toast
window.showConciergeToast = function (title, message, icon) {
  const toastHTML = `
    <div class="concierge-toast" style="position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: rgba(30,30,40,0.95); border: 1px solid rgba(255,255,255,0.1); padding: 16px 24px; border-radius: 12px; display: flex; align-items: center; gap: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 20000; animation: slideUpFade 0.4s ease-out forwards; min-width: 300px;">
      <div style="font-size: 24px;">${icon}</div>
      <div>
        <h4 style="margin: 0; color: #fff; font-size: 16px;">${title}</h4>
        <p style="margin: 4px 0 0; color: #aaa; font-size: 14px;">${message}</p>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', toastHTML);

  // Remove after 3 seconds
  setTimeout(() => {
    const toast = document.querySelector('.concierge-toast');
    if (toast) {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 20px)';
      setTimeout(() => toast.remove(), 400);
    }
  }, 3000);
};

// Add Service Request
window.addServiceRequest = function (service, details) {
  const reference = 'REQ-' + Math.floor(1000 + Math.random() * 9000);
  const booking = {
    type: 'service_request',
    reference: reference,
    service: service,
    details: details,
    timestamp: new Date().toISOString()
  };

  if (typeof bookingsHistory !== 'undefined') {
    bookingsHistory.push(booking);
    // Persist to local storage if needed, or just keep in memory
  }
  return reference;
};

// Book Concierge Item
window.bookConciergeItem = function (item, service, title, msg, icon) {
  // Add to service requests
  if (window.addServiceRequest) {
    window.addServiceRequest(service, `Booked: ${item}`);
  }

  // Show toast
  window.showConciergeToast(title, msg, icon);
};

// Initialize on load
initApp();
