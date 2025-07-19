import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { MyContext } from "../App";
import { useLocation } from "react-router-dom";

const VoiceAssistant = ({ triggeredManually }) => {
  const [isListening, setIsListening] = useState(false);
  const [showAssistantUI, setShowAssistantUI] = useState(false);
  const [transcript, setTranscript] = useState(""); // ✅ Added transcript state
  const recognitionRef = useRef(null);
  const wakeRecognitionRef = useRef(null);
  const [pendingVoiceCommand, setPendingVoiceCommand] = useState(null);
  const [wishcommand,setwishcommand]=useState(null);
  const location = useLocation();
 const { searchFromVoice, searchData ,featuredProductsdata,  Productdata,addtomyList,removemylist,mylistdata,removemetocart,cartdata,setrating} = useContext(MyContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if (cartdata.length === 0) {
      console.log("Waiting for cartdata...");
    } else{
      // console.log("helo")
    }
    if (pendingVoiceCommand && cartdata.length > 0) {
      if (
        (pendingVoiceCommand.includes("remove") || pendingVoiceCommand.includes("delete")) &&
        pendingVoiceCommand.includes("cart") &&
        location.pathname.toLowerCase() === "/cart"
      ) {
        if(cartdata.length>0){
          handleRemoveFromCart(pendingVoiceCommand);
        }else {
          setPendingVoiceCommand(pendingVoiceCommand); // optional: reuse the same mechanism
        }
     
      }
    
      setPendingVoiceCommand(null); // Clear it after running
  }
  },[cartdata])
 
  const handleRemoveFromCart = (cleaned) => {
    const transcriptLower = cleaned.toLowerCase();
    const words = transcriptLower.split(" ");
    
    let bestMatch = null;
    let bestScore = 0;
    let productId = null;
  console.log(cartdata)
    cartdata.forEach(product => {
      const productName = product.productName.toLowerCase();
      const productWords = productName.split(" ");
  
      const matchCount = productWords.filter(word => words.includes(word)).length;
  
      if (matchCount > bestScore) {
        bestScore = matchCount;
        productId = product._id;
        bestMatch = product;
      }
    });
  
    if (bestMatch && bestScore > 0) {
      removemetocart(productId);
      speak(`${bestMatch.name} has been removed from your cart`);
    } else {
      speak("Sorry, I couldn't find that product in your cart.");
    }
  };
  
  useEffect(()=>{
    if (mylistdata.length === 0) {
      console.log("Waiting for mylist...");
    } else{
     
    }
     if (wishcommand && mylistdata.length > 0) {
      if (
        (wishcommand.includes("remove") || wishcommand.includes("delete")) &&
       location.pathname.toLowerCase() === "/myList"
      ) {
        if(mylistdata.length>0){
          console.log("hey")
return handleRemoveFromWishlist(wishcommand);
        }else {
        return  setwishcommand(wishcommand); // optional: reuse the same mechanism
        }
     
      }
    
      setwishcommand(null); // Clear it after running
  }
  },[mylistdata])
  
  useEffect(() => {
    if (Productdata.length === 0) {
      console.log("Waiting for Productdata...");
    } else {
    
          
   
    }
    if (pendingVoiceCommand && Productdata.length > 0) {
      if(pendingVoiceCommand.includes("add") && pendingVoiceCommand.includes("popular")){
        handleAddPopularToWishlist(pendingVoiceCommand);
      }
    
      setPendingVoiceCommand(null); // Clear it after running
  }
  if (pendingVoiceCommand && Productdata.length > 0) {
    if (pendingVoiceCommand.includes("show") && pendingVoiceCommand.includes("detail")) {
      handleShowProductDetails(pendingVoiceCommand);
    }
    setPendingVoiceCommand(null);
  }
  }, [Productdata]);
 

  
  const handleShowProductDetails = (cleaned) => {
    const transcriptLower = cleaned.toLowerCase();
    const words = transcriptLower.split(" ");
  
    let bestMatch = null;
    let bestScore = 0;
  let bestMatch1=null;
  let bestScore1=0;

    Productdata.forEach(product => {
      const productName = product.name.toLowerCase();
      const productWords = productName.split(" ");
      const matchCount = productWords.filter(word => words.includes(word)).length;
  
      if (matchCount > bestScore) {
        bestScore = matchCount;
        bestMatch = product;
      }
    });
     featuredProductsdata.forEach(product => {
      const productName = product.name.toLowerCase();
      const productWords = productName.split(" ");
      const matchCount = productWords.filter(word => words.includes(word)).length;
  
      if (matchCount > bestScore1) {
        bestScore1 = matchCount;
        bestMatch1 = product;
      }
    });
  if(bestScore1>bestScore){
      navigate(`/product/${bestMatch1._id}`);
  }else{
     navigate(`/product/${bestMatch._id}`);
  }
    // if (bestMatch && bestScore > 0) {
    //   // Navigate programmatically
    //   navigate(`/product/${bestMatch._id}`);
    //   speak(`Showing details for ${bestMatch.name}`);
    // } else {
    //   speak("Sorry, I couldn't find that product");
    // }
  };

  const setValueAndTriggerInput = (input, value) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;

  nativeInputValueSetter.call(input, value); // update value the React way

  const inputEvent = new Event("input", { bubbles: true });
  input.dispatchEvent(inputEvent); // now triggers React's onChange
};


  const handleAddPopularToWishlist = (cleaned) => {
    const transcriptLower = cleaned.toLowerCase();
    
    const words = transcriptLower.split(" ");
  
    let bestMatch = null;
    let bestScore = 0;
  let productid=null;
  console.log(Productdata);
    Productdata.forEach(product => {
      const productName = product.name.toLowerCase();
      const productWords = productName.split(" ");
  
      const matchCount = productWords.filter(word => words.includes(word)).length;
  
      if (matchCount > bestScore) {
        bestScore = matchCount;
         productid=product?._id;
        bestMatch = product;
        addtomyList(productid,bestMatch);
      }
    });
  
    if (bestMatch && bestScore > 0) {
      

      speak(`${bestMatch.name} has been added to your wishlist`);
    } else {
      speak("Sorry, I couldn't find that product in popular items");
    }
  };
  
  const pages = [
    { command: "home", path: "/" },
    // { command: "cart", path: "/cart" },
    {command:"order",path:"/orders"}
    // { command: "wish list", path: "/myList" },
    // { command: "login", path: "/signin" },
    // { command: "register", path: "/signup" },
  ];

  const indexMap = {
    first: 0, second: 1, third: 2, fourth: 3, fifth: 4,
    sixth: 5, seventh: 6, eighth: 7, ninth: 8, tenth: 9,
  };

  const extractIndexFromTranscript = (text) => {
    const words = text.toLowerCase().split(" ");
    for (const word of words) {
      if (word in indexMap) return indexMap[word];
    }
    return null;
  };

  const handleRemoveFromWishlist = (cleaned) => {
    const transcriptLower = cleaned.toLowerCase();
    const words = transcriptLower.split(" ");
  
    let bestMatch = null;
    let bestScore = 0;
    let productId = null;
  console.log(mylistdata);
    mylistdata.forEach(product => {
      const productName = product.productName.toLowerCase();
      const productWords = productName.split(" ");
  
      const matchCount = productWords.filter(word => words.includes(word)).length;
  
      if (matchCount > bestScore) {
        bestScore = matchCount;
        productId = product._id;
        bestMatch = product;
      }
    });
  
    if (bestMatch && bestScore > 0) {
      removemylist(productId);  // you should have this function in context
      speak(`${bestMatch.name} has been removed from your wishlist`);
    } else {
      speak("Sorry, I couldn't find that product in your wishlist");
    }
  };
  
  const handleOpenProduct = () => {
    const index = extractIndexFromTranscript(transcript);
    const products = searchData;
  
    // 1. Try index-based navigation
    if (index !== null && products && products.length > index) {
      const selectedProduct = products[index];
      speak(`Opening ${selectedProduct.title}`);
      navigate(`/product/${selectedProduct._id}`);
      searchFromVoice("");
      return;
    }
  
    // 2. Try fuzzy keyword matching
    const spokenWords = transcript.toLowerCase().split(" ");
  
    let bestMatch = null;
    let bestScore = 0;
  
    products?.forEach(product => {
      if (!product?.name) return;
      const titleWords = product.name.toLowerCase().split(/[\s,-]+/);
      const commonWords = spokenWords.filter(word => titleWords.includes(word));
      
      if (commonWords.length > bestScore) {
        bestScore = commonWords.length;
        bestMatch = product;
      }
    });
  
    if (bestMatch && bestScore > 0) {
      speak(`Opening ${bestMatch.title}`);
      navigate(`/product/${bestMatch._id}`);
      searchFromVoice("");
      return;
    }
  
  };
  

  useEffect(() => {
    if (transcript) {
      handleOpenProduct();
    }
  }, [transcript]);

  const scrollCommands = [
    { type: "scroll", action: "down", keywords: ["scroll down", "go down", "move down", "down more", "scrol down", "scroll please"] },
    { type: "scroll", action: "up", keywords: ["scroll up", "go up", "move up", "up more", "go back", "scrol up"] },
    { type: "scroll", action: "top", keywords: ["scroll to top", "go top", "top", "back to top"] },
    { type: "scroll", action: "bottom", keywords: ["scroll to bottom", "go down end", "bottom", "go end"] },
    { type: "carousel", action: "left", keywords: ["scroll left", "go left", "previous", "move left"] },
    { type: "carousel", action: "right", keywords: ["scroll right", "go right", "next", "move right"] },
  ];

  const scrollCarousel = (direction) => {
    const carousel = document.querySelector(".carousel-container");
    if (!carousel) return;
    const scrollAmount = 500;
    carousel.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollFuse = new Fuse(
    scrollCommands.flatMap(cmd => cmd.keywords.map(k => ({ ...cmd, keyword: k }))),
    { keys: ["keyword"], threshold: 0.4 }
  );

  const fuse = new Fuse(pages, {
    keys: ["command"],
    threshold: 0.4,
  });

  useEffect(() => {
    const wakeRecognition = new window.webkitSpeechRecognition();
    wakeRecognition.continuous = true;
    wakeRecognition.lang = "en-US";
    wakeRecognition.interimResults = false;

    wakeRecognition.onresult = (event) => {
      const wakeTranscript = event.results[event.resultIndex][0].transcript.toLowerCase();
      console.log("Wake listener heard:", wakeTranscript);
      if (!isListening && wakeTranscript.includes("hello")) {
        startListening();
        wakeRecognition.stop();
      }
    };

    wakeRecognition.onerror = (e) => {
      console.warn("Wake recognition error:", e.error);
    };

    wakeRecognitionRef.current = wakeRecognition;
    wakeRecognition.start();

    return () => {
      wakeRecognition.stop();
    };
  }, []);

  useEffect(() => {
    if (triggeredManually) {
      startListening();
    }
  }, [triggeredManually]);

  const startListening = () => {
    if (isListening) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = true;

    let silenceTimer;

    const resetSilenceTimer = () => {
      if (silenceTimer) clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        recognition.stop();
      }, 10000);
    };

    recognition.onresult = (event) => {
      const voiceTranscript = event.results[event.resultIndex][0].transcript.toLowerCase();
      console.log("Command heard:", voiceTranscript);

      setTranscript(voiceTranscript); // ✅ Store transcript in state

      if (event.results[event.resultIndex].isFinal) {
        processCommand(voiceTranscript);
      }

      resetSilenceTimer();
    };

    recognition.onend = () => {
      setIsListening(false);
      setShowAssistantUI(false);
      speak("Voice assistant stopped due to silence.");
      wakeRecognitionRef.current?.start();
    };

    recognition.onerror = (e) => {
      console.warn("Recognition error:", e.error);
      setIsListening(false);
      setShowAssistantUI(false);
      wakeRecognitionRef.current?.start();
    };

    recognition.start();
    resetSilenceTimer();

    recognitionRef.current = recognition;
    setIsListening(true);
    setShowAssistantUI(true);
    speak("I'm listening...");
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const processCommand = (command) => {
 
    console.log("Processing:", command);
    const normalized = command.toLowerCase();
    const cleaned = normalized;
    if (
      (cleaned.includes("remove") || cleaned.includes("delete"))  &&
      location.pathname.toLowerCase() === "/cart"
    ) {
      if(cartdata.length>0){
        console.log("hlo")
        handleRemoveFromCart(cleaned);
      }else {
        console.log("hey")
        setPendingVoiceCommand(cleaned); // optional: reuse the same mechanism
      }
   
    }
    // for add product in cart in product detail page
    if((cleaned.includes("add")|| cleaned.includes("and")|| cleaned.includes("save")) &&   (cleaned.includes("card")     &&  /^\/product\/\w+/.test(location.pathname))){
      const cartbutton=document.getElementsByClassName("cart");
    if (cartbutton.length > 0) {
    cartbutton[0].click(); // Simulate click on "Add to cart" button
    console.log("Voice Command Triggered: Add to Cart");
  }

    }
     if((cleaned.includes("add")|| cleaned.includes("and")|| cleaned.includes("save")) && (cleaned.includes("wish list")     &&  /^\/product\/\w+/.test(location.pathname))){
      const listbutton=document.getElementsByClassName("list");
const wishlistButton = listbutton[2]; // Assuming index 2 is always wishlist

if (wishlistButton && wishlistButton.tagName === "BUTTON") {
  wishlistButton.click();
  console.log("Added to wishlist via voice command");
} else {
  console.log("Wishlist button not found or is not a button");
}

  

    }
      if(( cleaned.includes("review"))     && ( /^\/product\/\w+/.test(location.pathname))){
        
      const reviewbutton=document.getElementsByClassName("review");
// Assuming index 2 is always wishlist
console.log(reviewbutton);


reviewbutton[0].click();

  

    }
         if(( cleaned.includes("description"))     && ( /^\/product\/\w+/.test(location.pathname))){
      const descriptionbutton=document.getElementsByClassName("descriptions");



descriptionbutton[0].click();

  

    }
    if (cleaned.includes("review input")) {
  document.getElementById("review-input").focus();
}
    if (cleaned.includes("customer name")) {
  document.getElementById("customer-name").focus();
}
if (
  cleaned.includes("rate") ||
  cleaned.includes("rating") ||
  cleaned.includes("star") ||
  cleaned.includes("give")
) {
  const numberWordsToDigits = {
    one: 1, two: 2, three: 3, four: 4, five: 5,
  };

  const matchDigit = cleaned.match(/(?:rate|rating|give|star)\s+(\d)/);
  const matchWord = cleaned.match(/(?:rate|rating|give|star)\s+(one|two|three|four|five)/);

  let stars = null;
  if (matchDigit && matchDigit[1]) {
    stars = parseInt(matchDigit[1], 10);
  } else if (matchWord && matchWord[1]) {
    stars = numberWordsToDigits[matchWord[1]];
  }

  if (stars && stars >= 1 && stars <= 5) {
    setrating(stars); // Set state

    // Trigger onChange manually
    const ratingWrapper = document.getElementById("rating-wrapper");
    const input = ratingWrapper?.querySelector(`input[value="${stars}"]`);
    if (input) {
      input.click(); // This simulates star click
    }
  }
}


if(cleaned.includes("check out") && location.pathname==="/cart"){
  navigate("/checkout")
}
if (
  cleaned.includes("go to cart") ||
  cleaned.includes("open cart") ||
  cleaned.includes("navigate to cart")
) {
  navigate("/cart");
  speak("Navigating to your cart.");
}
if(location.pathname==="/checkout"){
  const name =document.getElementById("name");
  const country=document.getElementById("country");
  const address =document.getElementById("line1");
  const address2=document.getElementById("line1");
const city=document.getElementById("city");
const state=document.getElementById("state")
const zipcode=document.getElementById("zipcode");
const mobile=document.getElementById("mobile");
const email=document.getElementById("email");
const orderbutton=document.getElementById("place");
  if(cleaned.includes("name")){
    name.focus();
    }
   if(cleaned.includes("country")){
    country.focus();
}
if(cleaned.includes("zip")){
  zipcode.focus();

}
if(cleaned.includes("mobile")
){
  mobile.focus();
}
if(cleaned.includes("state"))  {
  state.focus();
}
  if(cleaned.includes("city")){
    city.focus();
}
if(cleaned.includes("address")){
  address.focus();
}
if(cleaned.includes("email")){
  email.focus();
}
if(cleaned.includes("second")){
  address2.focus();
}
if(cleaned.includes("type")|| cleaned.includes("write")){
  let message="";
  const match = cleaned.match(/(?:type|write)\s+(.*)/);
   if (match && match[1]) {
    message = match[1].trim();
  message = message.replace(/\s?at\s?/gi, "@").replace(/\s?dot\s?/gi, ".").replace(/\s?underscore\s?/gi, "_").replace(" ","");
  

    const setValueAndTriggerInput = (input, value) => {
      const proto = input.tagName === "TEXTAREA"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype;

      const nativeSetter = Object.getOwnPropertyDescriptor(proto, "value").set;
      nativeSetter.call(input, value);

      input.dispatchEvent(new Event("input", { bubbles: true }));
    };

    if (document.activeElement === name) {
      setValueAndTriggerInput(name, message);
    } else if (document.activeElement === country) {
      setValueAndTriggerInput(country, message);
    }  else if (document.activeElement === city) {
      setValueAndTriggerInput(city, message);
    }  else if (document.activeElement === address) {
      setValueAndTriggerInput(address, message);
    }  else if (document.activeElement === address2) {
      setValueAndTriggerInput(address2, message);
    }  else if (document.activeElement === email) {
      setValueAndTriggerInput(email, message);
    }  else if (document.activeElement === zipcode) {
      setValueAndTriggerInput(zipcode, message);
    }  else if (document.activeElement === state) {
      setValueAndTriggerInput(state, message);
    }   else if (document.activeElement ===mobile) {
      setValueAndTriggerInput(mobile, message);
    } 
    else {
      setValueAndTriggerInput(name, message);
    }
  }
}
if(cleaned.includes("place")||cleaned.includes("order")||cleaned.includes("buy")){
orderbutton.click();
}
}

if (cleaned.includes("type") || cleaned.includes("write")) {
  let message = "";

  const match = cleaned.match(/(?:type|write)\s+(.*)/);
  if (match && match[1]) {
    message = match[1].trim();

    const reviewInput = document.getElementById("review-input");
    const nameInput = document.getElementById("customer-name");

    const setValueAndTriggerInput = (input, value) => {
      const proto = input.tagName === "TEXTAREA"
        ? window.HTMLTextAreaElement.prototype
        : window.HTMLInputElement.prototype;

      const nativeSetter = Object.getOwnPropertyDescriptor(proto, "value").set;
      nativeSetter.call(input, value);

      input.dispatchEvent(new Event("input", { bubbles: true }));
    };

    if (document.activeElement === nameInput) {
      setValueAndTriggerInput(nameInput, message);
    } else if (document.activeElement === reviewInput) {
      setValueAndTriggerInput(reviewInput, message);
    } else {
      setValueAndTriggerInput(reviewInput, message);
    }
  }
}





if (cleaned.includes("submit review") || cleaned.includes("post review")) {
  document.getElementById("submit-review").click();
}
             if((cleaned.includes("additional")|| cleaned.includes("information")|| cleaned.includes("info"))     && ( /^\/product\/\w+/.test(location.pathname))){
      const descriptionbutton=document.getElementsByClassName("addinfo");



descriptionbutton[0].click();

  

    }
    if (
      (cleaned.includes("remove") || cleaned.includes("delete"))   &&   
      location.pathname === "/myList"
    ) {if(mylistdata.length>0){
 console.log("hey")
      handleRemoveFromWishlist(cleaned);
    }else{
      console.log("hello")
      setwishcommand(cleaned);
    }
     
    }
    if (cleaned.includes("show") && cleaned.includes("detail")) {
      if (Productdata.length > 0) {
        console.log("hello");
        handleShowProductDetails(cleaned);
      } else {
        setPendingVoiceCommand(cleaned); // optional: reuse the same mechanism
      }
    }

    if (
      (cleaned.includes("add") || cleaned.includes("save")) &&
      cleaned.includes("wish list") 
    ) {
       if (Productdata.length > 0) {
        console.log("helo")
        handleAddPopularToWishlist(cleaned);
    } else {
        setPendingVoiceCommand(cleaned);
    }
    } else if (
      cleaned.includes("go to wishlist") ||
      cleaned.includes("open wish list") ||
 
      cleaned.includes("wishlist page") ||
      cleaned.includes("navigate to wishlist")||
      cleaned.includes("click on wish list")
    ) {
      navigate("/myList");
      speak("Opening your wishlist");
    }
    
    if (normalized.includes("search for") || normalized.includes("find ")|| normalized.includes("find for ")) {
      const query = normalized.replace("search for", "").replace("find", "").trim();
      const searchTriggers = ["search for", "find", "look for"];

// Find which trigger is used
let voiceInput=normalized.trim();
let keyword = "";
for (let phrase of searchTriggers) {
  if (voiceInput.includes(phrase)) {
    keyword = voiceInput.split(phrase)[1]?.trim(); // get text after trigger phrase
    break;
  }
}
      speak(`Searching for ${query}`);
      searchFromVoice(keyword);
      return;
    }

if (normalized.includes("click on")) {
  const targetText = normalized.replace("click on", "").trim().toLowerCase();

  let clicked = false;

  // 🧭 1. Try to click on navbar items (e.g., Home, Menswear)
  const navbar = document.querySelector("#main-navbar");
  const navLinks = navbar?.querySelectorAll("a, button, li") || [];

  navLinks.forEach((el) => {
    const label = el.innerText?.toLowerCase().trim();
    if (label === targetText) {
      el.click();
      clicked = true;
     
    }
  });

  // 🧭 2. If not clicked in navbar, try to click in featured categories
  if (!clicked) {
    const categorySection = document.querySelector("#second-navbar");
    const categoryItems = categorySection?.querySelectorAll(".item") || [];

    categoryItems.forEach((el) => {
      const label = el.querySelector("h6")?.innerText.toLowerCase().trim();
      if (label === targetText) {
        el.closest("a")?.click();
        clicked = true;
 
      }
    });
  }

  // ❌ If not found anywhere
  if (!clicked) {
   
  }

  return;
}

    const scrollMatch = scrollFuse.search(normalized);
    if (scrollMatch.length > 0) {
      const matched = scrollMatch[0].item;
      switch (matched.action) {
        case "down": window.scrollBy({ top: 500, behavior: "smooth" }); speak("Scrolling down"); return;
        case "up": window.scrollBy({ top: -500, behavior: "smooth" }); speak("Scrolling up"); return;
        case "top": window.scrollTo({ top: 0, behavior: "smooth" }); speak("Scrolling to top"); return;
        case "bottom": window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); speak("Scrolling to bottom"); return;
        case "left": scrollCarousel("left"); speak("Scrolling left"); return;
        case "right": scrollCarousel("right"); speak("Scrolling right"); return;
      }
    }

    const words = normalized.split(" ");
    for (let word of words) {
      const result = fuse.search(word);
      if (result.length > 0) {
        const matchedPage = result[0].item;
        navigate(matchedPage.path);
       
        return;
      }
    }

  };

  return (
    <div>
      {showAssistantUI && (
        <div
          className="glowing-circle"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#00ffae",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            boxShadow: "0 0 15px #00ffae",
            zIndex: 9999,
            animation: "pulse 1.5s infinite",
          }}
        />
      )}
    </div>
  );
};

export default VoiceAssistant;
