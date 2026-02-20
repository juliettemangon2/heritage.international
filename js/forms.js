async function submitWaitlist(event) {
  event.preventDefault();

  const form = event.target;
  const data = Object.fromEntries(new FormData(form).entries());

  const res = await fetch("https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/submitWaitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    form.style.display = "none";
    document.getElementById("waitlistSuccess").style.display = "block";
    form.reset();
  } else {
    alert("Something went wrong. Please try again.");
  }
}

function submitContact(e) {
  e.preventDefault();
  document.getElementById('contactForm').querySelector('button').style.display = 'none';
  document.getElementById('contactSuccess').style.display = 'block';
}
