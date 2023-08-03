<template>
  <main>
    <page-title title="Checkout these amazing concerts in Graz." />
    <section class="filter">
      <label>
        Artist
        <br>
        <select v-model="artist" name="artist" id="pet-select">
          <option  value="nope">All Artists</option>
          <option v-for="(artist, index) in artists" :value="artist" :key="index">{{artist}}</option>
        </select>
      </label>
      <label>
        Location
        <br>
        <select  v-model="location" name="artist" id="pet-select">
          <option value="nope">All Locations</option>
          <option v-for="(location, index) in locations" :value="location" :key="index">{{location}}</option>
        </select>
      </label>
      <label>
        Date
        <br>
        <input type="date" placeholder="Select date">
      </label>
    </section>

    <section class="cards">
      <div v-for="(concert, index) in concerts" :key="index">
        <div @click="selectConcert(concert)" class="card" :class="{'disabled': concert.artist === artist || concert.location.name === location}">
          <h2>{{ concert.artist }}</h2>
          <p>{{ concert.location.name }}</p>
          <br>
          <div v-for="(show, index) in concert.shows" :key="index">
            <p>{{ new Date(show.start).toLocaleDateString() }}</p>
            <p>{{ new Date(show.start).toLocaleTimeString() }}-{{ new Date(show.end).toLocaleTimeString() }}</p>
            <br>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {PageTitle},
  data () {
    return {
      concerts: [],
      artists: [],
      locations: [],
      artist: "nope",
      location: "nope"
    }
  },
  mounted () {
    // Get concerts
    this.axios.get('/concerts').then((response) => {
      this.concerts = response.data.concerts
      this.concerts.map((concert) => {
        this.artists.push(concert.artist)
        this.locations.push(concert.location.name)
      })
    })
  },
  methods: {
    selectConcert (concert) {
      localStorage.setItem('concert', JSON.stringify(concert))
      this.$router.push('/booking')
    }
  }
}
</script>


<style scoped>
.disabled {
    display: none;
}
.filter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
}

.cards {
    display: flex;
    align-items: stretch;
    gap: 40px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 70px;
}

.card {
    border: 1px solid gray;
    padding: 16px;
    border-radius: 10px;
    max-width: 200px;
    width: 100%;
    cursor: pointer;
}

</style>
