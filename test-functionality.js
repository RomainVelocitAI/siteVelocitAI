#!/usr/bin/env node

const http = require('http');

// Function to make HTTP requests
function makeRequest(path = '/', port = 3000) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: port,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Test-Agent/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

// Function to check if text is present in HTML
function checkForContent(html, searchTerms) {
  const results = {};
  searchTerms.forEach(term => {
    results[term] = html.toLowerCase().includes(term.toLowerCase());
  });
  return results;
}

// Main test function
async function runTests() {
  console.log('🧪 Testing VelocitAI site functionality...\n');
  
  const testResults = {
    siteAccessible: false,
    hasCalculatorContent: false,
    hasWhatsAppLinks: false,
    hasThemeToggle: false,
    hasContactForm: false,
    hasHeroSection: false,
    hasFooter: false,
    errors: []
  };

  try {
    // Test 1: Check if site loads
    console.log('1️⃣ Testing site accessibility...');
    const response = await makeRequest('/', 3000);
    
    if (response.statusCode === 200) {
      testResults.siteAccessible = true;
      console.log('✅ Site loads successfully (Status: 200)');
    } else {
      testResults.errors.push(`Site returned status ${response.statusCode}`);
      console.log(`❌ Site returned status ${response.statusCode}`);
    }

    const html = response.body;
    
    // Test 2: Check for key content sections
    console.log('\n2️⃣ Checking for key sections...');
    
    // Hero section
    if (html.includes('Velocit.AI') || html.includes('automatisation') || html.includes('hero')) {
      testResults.hasHeroSection = true;
      console.log('✅ Hero section detected');
    } else {
      console.log('❌ Hero section not found');
    }

    // Calculator related content
    const calculatorTerms = ['calculateur', 'calculator', 'économies', 'tâches', 'automatiser'];
    const calculatorResults = checkForContent(html, calculatorTerms);
    const hasCalculatorContent = Object.values(calculatorResults).some(found => found);
    
    if (hasCalculatorContent) {
      testResults.hasCalculatorContent = true;
      console.log('✅ Calculator-related content found');
      console.log(`   Found terms: ${Object.entries(calculatorResults).filter(([k,v]) => v).map(([k,v]) => k).join(', ')}`);
    } else {
      console.log('❌ Calculator content not detected');
    }

    // WhatsApp integration
    const whatsappTerms = ['whatsapp', 'wa.me', '33756827384'];
    const whatsappResults = checkForContent(html, whatsappTerms);
    const hasWhatsApp = Object.values(whatsappResults).some(found => found);
    
    if (hasWhatsApp) {
      testResults.hasWhatsAppLinks = true;
      console.log('✅ WhatsApp integration detected');
    } else {
      console.log('❌ WhatsApp integration not found');
    }

    // Theme toggle (look for theme-related classes or attributes)
    const themeTerms = ['dark:', 'theme', 'sun', 'moon'];
    const themeResults = checkForContent(html, themeTerms);
    const hasTheme = Object.values(themeResults).some(found => found);
    
    if (hasTheme) {
      testResults.hasThemeToggle = true;
      console.log('✅ Theme toggle functionality detected');
    } else {
      console.log('❌ Theme toggle not found');
    }

    // Contact form
    const contactTerms = ['contact', 'formulaire', 'form', 'email', 'message'];
    const contactResults = checkForContent(html, contactTerms);
    const hasContact = Object.values(contactResults).some(found => found);
    
    if (hasContact) {
      testResults.hasContactForm = true;
      console.log('✅ Contact form detected');
    } else {
      console.log('❌ Contact form not found');
    }

    // Footer
    if (html.includes('footer') || html.includes('© ') || html.includes('copyright')) {
      testResults.hasFooter = true;
      console.log('✅ Footer detected');
    } else {
      console.log('❌ Footer not found');
    }
    
    // Test 3: Check JavaScript loading
    console.log('\n3️⃣ Checking JavaScript assets...');
    const jsAssets = html.match(/_next\/static.*?\.js/g) || [];
    if (jsAssets.length > 0) {
      console.log(`✅ Found ${jsAssets.length} JavaScript assets`);
      console.log(`   Main assets: ${jsAssets.slice(0, 3).join(', ')}${jsAssets.length > 3 ? '...' : ''}`);
    } else {
      console.log('❌ No JavaScript assets found');
      testResults.errors.push('No JavaScript assets detected');
    }

    // Test 4: Check CSS loading
    console.log('\n4️⃣ Checking CSS assets...');
    const cssAssets = html.match(/\.css/g) || [];
    if (cssAssets.length > 0 || html.includes('<style')) {
      console.log('✅ CSS assets detected');
    } else {
      console.log('❌ No CSS assets found');
      testResults.errors.push('No CSS assets detected');
    }

  } catch (error) {
    testResults.errors.push(`Connection error: ${error.message}`);
    console.log(`❌ Failed to connect to site: ${error.message}`);
  }

  // Final results
  console.log('\n📊 SUMMARY REPORT');
  console.log('==================');
  console.log(`Site Accessible: ${testResults.siteAccessible ? '✅' : '❌'}`);
  console.log(`Hero Section: ${testResults.hasHeroSection ? '✅' : '❌'}`);
  console.log(`Calculator: ${testResults.hasCalculatorContent ? '✅' : '❌'}`);
  console.log(`WhatsApp Integration: ${testResults.hasWhatsAppLinks ? '✅' : '❌'}`);
  console.log(`Theme Toggle: ${testResults.hasThemeToggle ? '✅' : '❌'}`);
  console.log(`Contact Form: ${testResults.hasContactForm ? '✅' : '❌'}`);
  console.log(`Footer: ${testResults.hasFooter ? '✅' : '❌'}`);
  
  if (testResults.errors.length > 0) {
    console.log('\n⚠️  ERRORS FOUND:');
    testResults.errors.forEach(error => console.log(`   - ${error}`));
  }
  
  const passedTests = Object.values(testResults).filter(v => typeof v === 'boolean' && v).length;
  const totalTests = Object.keys(testResults).filter(k => k !== 'errors').length;
  
  console.log(`\n🎯 SCORE: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests && testResults.errors.length === 0) {
    console.log('🎉 ALL TESTS PASSED! Site is working correctly.');
    process.exit(0);
  } else {
    console.log('⚠️  Some issues detected. Check the results above.');
    process.exit(1);
  }
}

// Run the tests
runTests().catch(console.error);