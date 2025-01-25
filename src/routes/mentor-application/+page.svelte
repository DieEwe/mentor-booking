<!-- src/routes/mentor-application/+page.svelte -->
<script lang="ts">
  let firstName = '';
  let lastName = '';
  let email = '';
  let motivation = '';

  function submitApplication() {
    // In a real app, you'd send this to a server.
    // For now, just console.log or show a confirmation.
    console.log('Mentor Application:', { firstName, lastName, email, motivation });
    alert('Your application has been submitted. Thank you!');
    // Reset form
    firstName = '';
    lastName = '';
    email = '';
    motivation = '';
  }
</script>

<h2>Apply as a Mentor</h2>

<div class="form-section">
  <label for="firstName">First Name:</label>
  <input id="firstName" class="input-text" bind:value={firstName} />
</div>
<div class="form-section">
  <label for="lastName">Last Name:</label>
  <input id="lastName" class="input-text" bind:value={lastName} />
</div>
<div class="form-section">
  <label for="email">Email:</label>
  <input id="email" type="email" class="input-text" bind:value={email} />
</div>
<div class="form-section">
  <label for="motivation">Motivation (why do you want to mentor?):</label><br />
  <textarea id="motivation" rows="5" cols="40" bind:value={motivation}></textarea>
</div>
<button class="button" on:click={submitApplication}>
  Submit Application
</button>
