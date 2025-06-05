// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links-container');
const navLinks = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active');
  hamburger.classList.toggle('active');

  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !expanded);
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Split screen hover effect
const container = document.querySelector('.container');
const left = document.querySelector('.left');
const right = document.querySelector('.right');

left.addEventListener('mouseenter', () => {
  container.classList.add('hover-left');
  toggleAfterPlayTextLines('left');
});

left.addEventListener('mouseleave', () => {
  container.classList.remove('hover-left');
  resetAfterPlayTextLines();
});

right.addEventListener('mouseenter', () => {
  container.classList.add('hover-right');
  toggleAfterPlayTextLines('right');
});

right.addEventListener('mouseleave', () => {
  container.classList.remove('hover-right');
  resetAfterPlayTextLines();
});

function toggleAfterPlayTextLines(sideHovered) {
  const leftAfterText = left.querySelector('.after-play-text');
  const rightAfterText = right.querySelector('.after-play-text');

  if (sideHovered === 'left') {
    if (leftAfterText) leftAfterText.classList.add('two-rows');
    if (rightAfterText) rightAfterText.classList.remove('two-rows');
  } else if (sideHovered === 'right') {
    if (rightAfterText) rightAfterText.classList.add('two-rows');
    if (leftAfterText) leftAfterText.classList.remove('two-rows');
  }
}

function resetAfterPlayTextLines() {
  const leftAfterText = left.querySelector('.after-play-text');
  const rightAfterText = right.querySelector('.after-play-text');

  if (leftAfterText) leftAfterText.classList.remove('two-rows');
  if (rightAfterText) rightAfterText.classList.remove('two-rows');
}

// Learn More buttons behavior
const learnMoreButtons = document.querySelectorAll('.learn-more-btn');

learnMoreButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();

    const sideContent = this.closest('.content');

    // Prevent adding multiple expandable texts
    if (sideContent.querySelector('.after-play-container')) return;

    // Hide the Learn More button
    this.style.display = 'none';

    // Create container for text + new button
    const afterPlayContainer = document.createElement('div');
    afterPlayContainer.classList.add('after-play-container');

    // Create text element
    const afterPlayText = document.createElement('div');
    afterPlayText.classList.add('after-play-text');

    // Different text for left and right
    const splitSide = this.closest('.split');
    if (splitSide.classList.contains('left')) {
      afterPlayText.textContent = "Building a report involves gathering all the needs from the customer. During these requirement gathering sessions , we ask the customer multitude of questions, ranging from their expectations from this report and where the source data resides, to granular details like how frequently they would like to see fresh data. The customer may say, we need to see a report of all the sales by department, with the ability to drill down to a specific store, for the last 2 years.We run with this requirement, analyze the source data and reach out to the customer in case of any questions and concerns. And we build the report, validate if the numbers look good and have the customer validate from their side as well. Once everyone is happy, it will be published in a desired location where the customer can access it from.";
    } else {
      afterPlayText.textContent = "Most of the Business Intelligence tools currently available in the market are self service, , meaning customers can learn how to use them without a steep learning curve. It is the intuitive nature of the tools that enable the customers to pick up new technologies. Using these self-service features, customers can also build simple reports from an existing data model or alter an existing report to suit their needs or pleasing to their eyes. When it comes to developing complex reports where source data is not in a desired format and demands a lot of transformation before it can be used, it requires a good amount of scripting skills and deep knowledge of what the tool can do and what it can not. This enables the learner how to achieve what (s)he needs. And efficiency is another area to focus on. Just achieving the ask may not be sufficient, if the report does not  perform well. We offer training sessions to help the learners transition into experts.";
    }

    // Initially clamp to 2 lines
    afterPlayText.classList.add('two-rows');

    // Set initial font size based on screen size
    if (window.innerWidth <= 768) {
      afterPlayText.style.fontSize = '18px';  // smaller on small screen initially
    } else {
      afterPlayText.style.fontSize = '18px';  // larger on large screen initially
    }

    // Create button container
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('after-play-buttons');

    const newBtn = document.createElement('a');
    newBtn.href = "#";
    newBtn.classList.add('btn');

    if (splitSide.classList.contains('left')) {
      newBtn.classList.add('left-btn');
      newBtn.textContent = "Click Here To Get Created Reports";
      newBtn.href = "getCreatedReports.html";
    } else {
      newBtn.classList.add('right-btn');
      newBtn.textContent = "Click Here To Learn To Get Reports";
      newBtn.href = "learnReports.html";
    }

    buttonsDiv.appendChild(newBtn);
    afterPlayContainer.appendChild(afterPlayText);
    afterPlayContainer.appendChild(buttonsDiv);
    sideContent.appendChild(afterPlayContainer);

    // Add .expanded class to container to allow full height & scrolling on small screens
    container.classList.add('expanded');

    // SET explicit container height to scrollHeight to prevent jump
    container.style.height = container.scrollHeight + 'px';

    // On clicking the afterPlayText, expand full text and remove clamp
    afterPlayText.addEventListener('click', () => {
      afterPlayText.classList.remove('two-rows');
      afterPlayText.style.cursor = 'default';

      // Increase font size more on small screens when expanded
      if (window.innerWidth <= 768) {
        afterPlayText.style.fontSize = '24px';  // bigger font size on expand for small screen
      } else {
        afterPlayText.style.fontSize = '22px';  // keep large screen font size on expand
      }

      afterPlayText.removeEventListener('click', arguments.callee);

      // Update container height after expanding text
      container.style.height = container.scrollHeight + 'px';
    });
  });
});

// Small screen gap fix using --vh CSS variable
function setMobileVH() {
  if (window.innerWidth <= 768) {
    // Calculate 1% of viewport height
    let vh = window.innerHeight * 0.01;
    // Set custom property --vh
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  } else {
    // Remove the property on larger screens
    document.documentElement.style.removeProperty('--vh');
  }
}

// Run once on load and on resize
window.addEventListener('load', setMobileVH);
window.addEventListener('resize', () => {
  setMobileVH();

  if (!container) return;

  if (window.innerWidth <= 768) {
    if (container.classList.contains('expanded')) {
      // Update container height to current scrollHeight to avoid jump on resize
      container.style.height = container.scrollHeight + 'px';
    } else {
      // Reset container height to fixed vh
      const vh = window.innerHeight * 0.01;
      container.style.height = `calc(${vh}px * 100)`;
    }
  } else {
    // Remove inline style on larger screens
    container.style.height = '';
  }
});
