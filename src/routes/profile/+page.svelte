<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { userStore } from '$lib/stores/userStore';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';

  let currentUserState = get(userStore);
  let tempPassword = '';
  let showLastName: boolean;
  let description: string;
  let visibleDisability: boolean;
  let nonVisibleDisability: boolean;
  let showDisability: boolean;

  onMount(() => {
    if (!currentUserState.isLoggedIn || !currentUserState.user) {
      goto('/');
    } else {
      // Initialize fields from user data
      showLastName = currentUserState.user.showLastName;
      description = currentUserState.user.description || '';
      visibleDisability = currentUserState.user.visibleDisability || false;
      nonVisibleDisability = currentUserState.user.nonVisibleDisability || false;
      showDisability = currentUserState.user.showDisability || false;
    }
  });

  function saveProfile() {
    // In real app, you'd update user data on the server.
    // For this demo, we just locally mutate the store user
    userStore.update((state) => {
      if (state.user) {
        state.user.showLastName = showLastName;
        state.user.description = description;
        state.user.visibleDisability = visibleDisability;
        state.user.nonVisibleDisability = nonVisibleDisability;
        state.user.showDisability = showDisability;
        if (tempPassword) {
          state.user.password = tempPassword;
        }
      }
      return state;
    });
    alert('Profile saved!');
  }
</script>

<h2>My Profile</h2>

{#if currentUserState.isLoggedIn}
  <div class="form-section">
    <label for="nickname-email">Nickname / Email: </label>
    <strong id="nickname-email">{currentUserState.user?.nickname || currentUserState.user?.email}</strong>
  </div>

  <div class="form-section">
    <label for="change-password">Change Password:</label>
    <input id="change-password" type="password" class="input-text" bind:value={tempPassword} placeholder="New password" />
  </div>

  <div class="form-section">
    <label for="show-last-name">
      <input id="show-last-name" class="checkbox" type="checkbox" bind:checked={showLastName} />
      Show my last name on my profile
    </label>
  </div>

  <div class="form-section">
    <label for="description">Description:</label><br />
    <textarea id="description" rows="3" cols="40" bind:value={description}></textarea>
    <textarea rows="3" cols="40" bind:value={description}></textarea>
  </div>

  <div class="form-section">
    <p>Disability Settings:</p>
    <label>
      <input class="checkbox" type="checkbox" bind:checked={visibleDisability} />
      I have a visible disability
    </label><br />
    <label>
      <input class="checkbox" type="checkbox" bind:checked={nonVisibleDisability} />
      I have a non-visible disability
    </label><br />
    <label>
      <input class="checkbox" type="checkbox" bind:checked={showDisability} />
      Display my disability status on my profile
    </label>
  </div>

  <button class="button" on:click={saveProfile}>Save Changes</button>
{:else}
  <p>You must be logged in to view this page.</p>
{/if}
