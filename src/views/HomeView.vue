<template>
  <main>
    <page-title title="Checkout these amazing concerts in Graz." />
    <section class="filter">
      <label>
        Artist
        <br>
        <select @change="filter" v-model="artist" name="artist" id="pet-select">
          <option  value="null">All Artists</option>
          <option v-for="(artist, index) in artists" :value="artist" :key="index">{{artist}}</option>
        </select>
      </label>
      <label>
        Location
        <br>
        <select @change="filter" v-model="location" name="artist" id="pet-select">
          <option value="null">All Locations</option>
          <option v-for="(location, index) in locations" :value="location" :key="index">{{location}}</option>
        </select>
      </label>
      <label>
        Date
        <br>
        <input type="date" placeholder="Select date">
      </label>
      <button @click="clear()" v-if="artist !== 'null' || location !== 'null'">Clear</button>
    </section>

    <section class="cards">
      <div v-for="(concert, index) in concerts" :key="index">
        <div @click="selectConcert(concert)" class="card" v-show="concert.enabled">
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
      table: [],
      artists: [],
      locations: [],
      artist: 'null',
      location: 'null'
    }
  },
  mounted () {
    // Get concerts
    this.axios.get('/concerts').then((response) => {
      this.concerts = response.data.concerts
      this.concerts.map((concert, index) => {
        this.concerts[index].enabled = true
        this.artists.push(concert.artist)
        this.locations.push(concert.location.name)
      })
      this.table = this.concerts
    })
  },
  methods: {
    clear () {
      this.artist =  'null'
      this.location =  'null'
      this.filter()
    },
    filter () {
      this.concerts.map((concert, index) => {
        if((this.artist !== 'null' && concert.artist !== this.artist) ||
          (this.location !== 'null' && concert.location.name !== this.location)
        ) {
          this.concerts[index].enabled = false
        }
        if(this.artist === 'null' && this.location === 'null'){
          this.concerts[index].enabled = true
        }
      })
    },
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
    height: 100%;
}

.card {
    border: 1px solid gray;
    padding: 16px;
    border-radius: 10px;
    max-width: 250px;
    width: 100%;
    cursor: pointer;
}

</style>
