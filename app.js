const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome to your personal sanctuary for thoughts and reflections. Our Daily Journal website provides a serene and private space for you to capture your daily experiences, emotions, and aspirations. Whether you are documenting your day-to-day activities or delving into deeper introspection, our platform is designed to support and inspire you. Here, you can create and organize your entries effortlessly, ensuring that your memories and insights are always at your fingertips. The minimalist design and user-friendly interface make journaling a seamless and enjoyable activity, allowing you to focus on what truly matters—your journey. Start your day with a fresh perspective by jotting down your morning thoughts, or unwind in the evening by reflecting on the day's events. Our secure and private environment ensures that your entries are kept safe, allowing you to write with complete peace of mind. Join our community of like-minded individuals who value the power of self-expression and personal growth. Embark on a journey of self-discovery and mindfulness with our Daily Journal website, and let your words guide you towards a more fulfilled and reflective life."
const aboutContent = "Welcome to the Daily Journal, your digital haven for personal expression and introspection. Our mission is to provide a secure, intuitive, and inspiring platform where you can document your life's journey, capture meaningful moments, and reflect on your experiences. We believe journaling is a powerful tool for self-discovery and personal growth, and we're here to make that process seamless and enriching. With a focus on privacy and security, we ensure your entries are kept safe, allowing you to write with complete confidence. Our user-friendly interface and minimalist design remove distractions, helping you focus solely on your writing. Whether you're a seasoned journaler or new to the practice, our features cater to all your needs. We're passionate about fostering a community of like-minded individuals who value self-expression and the journey toward self-awareness. At Daily Journal, we believe every story matters, and we are honored to be a part of your personal narrative. Thank you for choosing us as your companion on the path to a more mindful and reflective life."
const contactContent = "Welcome to the Daily Journal, your go-to digital space for personal reflection and self-expression. Our platform is designed to help you document your life's journey, capture meaningful moments, and reflect on your experiences with ease and privacy. We prioritize your security, ensuring your entries are safe, so you can write with complete peace of mind. Whether you're an experienced journaler or just starting, our intuitive and distraction-free interface supports your needs. Join our community and let Daily Journal be your trusted companion on the path to self-discovery and personal growth."

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

// Home page
app.get("/", function(req,res) {
  res.render("home", {
    startingContent: homeStartingContent,
    newPosts : posts
  });
});

// About page
app.get("/about", function(req,res) {
  res.render("about", {aboutPageContent: aboutContent});
});

// Contact page
app.get("/contact", function(req,res) {
  res.render("contact",{contactPageContent: contactContent});
});

// Compose page
app.get("/compose", function(req,res) {
  res.render("compose");
}); 

app.post("/compose", function(req,res) {
  const post = {
    title : req.body.composeTitle,
    body : req.body.composePost
  };

  posts.push(post);

  res.redirect("/");
});

// Posts page
app.get("/posts/:postName", function(req,res) {
  const postName = req.params.postName;
  let newPagePost = [];
  posts.forEach(function(post) {
    if (post.title === postName) {
      res.render("post",{postName : post})
    };
  });
  
  
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});

  