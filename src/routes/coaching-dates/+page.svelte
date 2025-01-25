<!-- src/routes/coaching-dates/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { userStore } from '$lib/stores/userStore';
    import type { UserState } from '$lib/stores/userStore';
    import { events } from '$lib/dummyData';
    import { goto } from '$app/navigation';
    import type { Event } from '$lib/dummyData';

    let currentEvents = events;
    let currentUser: UserState = get(userStore) as UserState;
  
    // For adding/editing events:
    let showForm = false;
    let editMode = false;
     // We'll define formData as type Event here:
    let formData: Event = {
    // Provide initial default values so TypeScript is happy
      id: 0,
      date: '',
      time: '',
      company: '',
      address: '',
      saeule: 1,
      saeuleDescription: '',
      mentorName: undefined,
      coachName: undefined,
      backupMentorName: undefined
  };
  
    $: userStore.subscribe((val) => {
      currentUser = val;
    });
  
    onMount(() => {
      // If not logged in, redirect to home
      if (!currentUser.isLoggedIn) {
        goto('/');
      }
    });
  
    function isMentor() {
      return currentUser.isLoggedIn && currentUser.user?.role === 'mentor';
    }
  
    function isCoach() {
      return currentUser.isLoggedIn && currentUser.user?.role === 'coach';
    }
  
    function optInAsMentor(eId: number) {
      const ev = currentEvents.find((ev) => ev.id === eId);
      if (ev && !ev.mentorName) {
        ev.mentorName = currentUser.user?.firstName || 'Unknown';
      }
    }
  
    function deleteEvent(eId: number) {
      currentEvents = currentEvents.filter(ev => ev.id !== eId);
    }
  
    function openAddForm() {
    editMode = false;
    // Reset formData to blank defaults or whatever you want:
    formData = {
      id: 0,
      date: '',
      time: '',
      company: '',
      address: '',
      saeule: 1,
      saeuleDescription: '',
      mentorName: undefined,
      coachName: undefined,
      backupMentorName: undefined
    };
    showForm = true;
  }
  
    function openEditForm(ev: Event) {
      editMode = true;
      // Safe to assign, because ev is also type Event
      formData = structuredClone(ev);
      showForm = true;
    }
  
    function saveEvent() {
      if (editMode) {
        // Update existing
        const index = currentEvents.findIndex((ev) => ev.id === formData.id);
        if (index !== -1) {
          currentEvents[index] = structuredClone(formData);
        }
      } else {
        // Create new
        const newId = Math.max(...currentEvents.map(e => e.id)) + 1;
        formData.id = newId;
        currentEvents.push(structuredClone(formData));
      }
      showForm = false;
    }
  
    function cancelForm() {
      showForm = false;
    }
  </script>
  
  <h2>Coaching Dates Overview</h2>
  
  <table border="1" width="100%" style="border-collapse: collapse;">
    <thead>
      <tr>
        <th>Date</th>
        <th>Time</th>
        <th>Pledger/Company</th>
        <th>Address</th>
        <th>Säule (# &amp; Description)</th>
        <th>Mentor</th>
        <th>Coach</th>
        <th>Backup Mentor</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each currentEvents as ev}
        <tr>
          <td>{ev.date}</td>
          <td>{ev.time}</td>
          <td>{ev.company}</td>
          <td>{ev.address}</td>
          <td>{ev.saeule} - {ev.saeuleDescription}</td>
          <td>
            {#if ev.mentorName}
              {ev.mentorName}
            {:else if isMentor()}
              <input type="checkbox" on:change={() => optInAsMentor(ev.id)} />
            {:else}
              -
            {/if}
          </td>
          <td>{ev.coachName}</td>
          <td>{ev.backupMentorName || '-'}</td>
          <td>
            {#if isCoach()}
              <button class="button" on:click={() => openEditForm(ev)}>Edit</button>
              <button class="button" on:click={() => deleteEvent(ev.id)}>Delete</button>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  {#if isCoach()}
    <button class="button" on:click={openAddForm}>Add New Event</button>
  {/if}
  
  <!-- Add/Edit Event Form (Coaches only) -->
  {#if showForm && isCoach()}
    <div style="margin-top: 2rem; border: 1px solid #ccc; padding: 1rem;">
      <h3>{editMode ? 'Edit Event' : 'Add New Event'}</h3>
      <div class="form-section">
        <label for="date">Date:</label>
        <input id="date" class="input-text" bind:value={formData.date} />
      </div>
      <div class="form-section">
        <label for="time">Time:</label>
        <input id="time" class="input-text" bind:value={formData.time} />
      </div>
      <div class="form-section">
        <label for="company">Company:</label>
        <input id="company" class="input-text" bind:value={formData.company} />
      </div>
      <div class="form-section">
        <label for="address">Address:</label>
        <input id="address" class="input-text" bind:value={formData.address} />
      </div>
      <div class="form-section">
        <label for="saeule">Säule (1-8):</label>
        <input id="saeule" class="input-text" type="number" min="1" max="8" bind:value={formData.saeule} />
      </div>
      <div class="form-section">
        <label for="saeuleDescription">Säule Description:</label>
        <input id="saeuleDescription" class="input-text" bind:value={formData.saeuleDescription} />
      </div>
      <div class="form-section">
        <label for="coachName">Coach Name:</label>
        <input id="coachName" class="input-text" bind:value={formData.coachName} />
      </div>
      <div class="form-section">
        <label for="mentorName">Mentor Name:</label>
        <input id="mentorName" class="input-text" bind:value={formData.mentorName} />
      </div>
      <div class="form-section">
        <label for="backupMentorName">Backup Mentor Name:</label>
        <input id="backupMentorName" class="input-text" bind:value={formData.backupMentorName} />
      </div>
  
      <button class="button" on:click={saveEvent}>{editMode ? 'Save Changes' : 'Create Event'}</button>
      <button class="button" on:click={cancelForm}>Cancel</button>
    </div>
  {/if}
  