document.getElementById("contact-form").addEventListener("submit", async function(e) {
    e.preventDefault();
  
    const formData = {
      name: this.name.value,
      email: this.email.value,
      message: this.message.value,
    };
  
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Message sent successfully!");
        this.reset();
      } else {
        alert("Error sending message: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    }
  });
<section class="certificates">
  <h2 id="certificates-heading">Certificates</h2>
  <ul class="cert-list">
    <li>Cloud Computing - AWS</li>
    <li>Google Analytics - Google</li>
    <li>Google Advanced Software Engineering - WALMART</li>
    <li>Young Professional - TCS</li>
    <li>Generative AI - Microsoft</li>
    <li>HTML - ITT Bombay</li>
    <li>IBM Data Science - IBM</li>
  </ul>
</section>
  