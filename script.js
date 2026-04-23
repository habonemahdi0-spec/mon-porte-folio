// CURSOR
const cur = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});

(function anim() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  curR.style.left = rx + 'px';
  curR.style.top = ry + 'px';
  requestAnimationFrame(anim);
})();

document.querySelectorAll('a, button, .skill-card, .project-card, .pres-card, .contact-email-card, .chat-toggle, .chat-send, .chat-close').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.classList.add('big');
    curR.classList.add('big');
  });
  el.addEventListener('mouseleave', () => {
    cur.classList.remove('big');
    curR.classList.remove('big');
  });
});

// NAVIGATION
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// REVEAL ON SCROLL
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(r => io.observe(r));

// SEND MESSAGE (mailto)
function sendMsg() {
  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const msg = document.getElementById('msgBody').value.trim();
  
  if (!name || !email || !msg) {
    alert('Please fill in all fields.');
    return;
  }
  
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + msg);
  window.location.href = 'mailto:habonemahdi0@gmail.com?subject=' + subject + '&body=' + body;
  
  const successDiv = document.getElementById('msgSuccess');
  if (successDiv) {
    successDiv.style.display = 'block';
    document.getElementById('senderName').value = '';
    document.getElementById('senderEmail').value = '';
    document.getElementById('msgBody').value = '';
    setTimeout(() => {
      successDiv.style.display = 'none';
    }, 5000);
  }
}

// CHAT BOT
function toggleChat() {
  const window = document.getElementById('chatWindow');
  window.classList.toggle('open');
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;
  
  const messagesContainer = document.getElementById('chatMessages');
  
  // Add user message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'message user';
  userMsgDiv.innerHTML = '<div class="message-content">' + escapeHtml(message) + '</div>';
  messagesContainer.appendChild(userMsgDiv);
  
  input.value = '';
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Show typing indicator
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = '<div class="bot-avatar"><i class="fas fa-robot"></i></div><div class="typing-indicator"><span></span><span></span><span></span></div>';
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  setTimeout(() => {
    // Remove typing indicator
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
    
    // Add bot response
    const botMsgDiv = document.createElement('div');
    botMsgDiv.className = 'message bot';
    botMsgDiv.innerHTML = '<div class="bot-avatar"><i class="fas fa-robot"></i></div><div class="message-content">' + getBotResponse(message.toLowerCase()) + '</div>';
    messagesContainer.appendChild(botMsgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 800);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getBotResponse(msg) {
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hello! Welcome to my portfolio. How can I help you today?";
  }
  else if (msg.includes('skill') || msg.includes('technologie') || msg.includes('tech stack')) {
    return "I work with HTML5, CSS3, JavaScript, React, Node.js, Python, C++, and Git. I'm also familiar with Bootstrap, SQL, and REST APIs.";
  }
  else if (msg.includes('project') || msg.includes('projet')) {
    return "I have three main projects: CLINO Game (C++ strategy game), TaskFlow (Android task manager), and VocabMaster (English learning web app). Would you like to know more about any of them?";
  }
  else if (msg.includes('clino')) {
    return "CLINO Game is a strategic console game built with C++. It features complex algorithms and engaging gameplay mechanics. It was a great project for practicing OOP and algorithm design.";
  }
  else if (msg.includes('taskflow')) {
    return "TaskFlow is an Android task management app built with Java and SQLite. It allows users to create, edit, and delete tasks with a smooth, intuitive interface.";
  }
  else if (msg.includes('vocabmaster')) {
    return "VocabMaster is a full-stack English learning platform using React, Node.js, and MongoDB. It includes flashcards, quizzes, and progress tracking features.";
  }
  else if (msg.includes('contact') || msg.includes('email')) {
    return "You can reach me at habonemahdi0@gmail.com or use the contact form on this page. I typically respond within 24-48 hours.";
  }
  else if (msg.includes('experience') || msg.includes('background')) {
    return "I'm currently a computer engineering student with a focus on software development. I've worked on various projects including web apps, mobile apps, and games. I'm always looking to learn and grow!";
  }
  else if (msg.includes('internship') || msg.includes('stage')) {
    return "Yes, I'm open to internships! I'm looking for opportunities in web development, mobile development, or software engineering. Feel free to contact me via email!";
  }
  else if (msg.includes('thanks') || msg.includes('thank')) {
    return "You're welcome! Feel free to ask if you have any other questions.";
  }
  else if (msg.includes('about')) {
    return "I'm a computer engineering student passionate about building modern web and mobile applications. I love clean code and thoughtful design!";
  }
  else {
    return "Thank you for your message! For specific questions about collaboration or opportunities, please use the contact form or email me directly at habonemahdi0@gmail.com";
  }
}

// Allow Enter key in chat input
document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    sendChatMessage();
  }
});
