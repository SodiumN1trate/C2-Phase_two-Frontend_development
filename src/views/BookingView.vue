<template>
  <main>
    <page-title title="Book seats for your show" />


    <div class="card" v-if="concert">
      <h2>{{ concert.artist }}</h2>
      <p>{{ concert.location.name }}</p>
      <br>
      <div v-for="(show, index) in concert.shows" :key="index">
        <p>{{ new Date(show.start).toLocaleDateString() }}</p>
        <p>{{ new Date(show.start).toLocaleTimeString() }}-{{ new Date(show.end).toLocaleTimeString() }}</p>
        <br>
      </div>
    </div>

    <section class="selected-seats">
      <h1>Selected seats</h1>
      <template v-if="selectedSeats.length > 0">
        <p v-for="(row, index) in selectedSeats" :key="index">Row: {{ row.row.name }}, Seat: {{ row.seat }}</p>
        <button style="padding: 16px; font-size: 18px;" @click="details = !details">{{ !details ? "Enter Booking Details" : "Change Seats"}}</button>
      </template>
      <p v-else>No seats selected. Click on seat to make a reservation.</p>
    </section>

    <div v-show="!details">
      <section class="stage">
        <h1>Stage</h1>
      </section>
      <section class="seats-container">
        <div class="seats" v-for="(row, index) in seating" :key="index">
          <h1>{{ row.name }}</h1>
          <div class="seats-row">
            <div :ref="`${row.name}.${seat}`" class="seat-available" @click="selectSeat($event, row, seat)" v-for="(seat, index) in row.seats.total" :key="index" :class="{'seat-unavailable': row.seats.unavailable.includes(seat)}">{{ seat.number }}</div>
          </div>
        </div>
      </section>
    </div>
    <div v-show="details">
      <section class="details">
        <h1>Please enter your details</h1>
      </section>
      <section class="seats-container">
        <label>
          Name
          <br>
          <input type="text" v-model="form.name" >
        </label>
        <label>
          Address
          <br>
          <input type="text" v-model="form.address" >
        </label>
        <label>
          City
          <br>
          <input type="text" v-model="form.city" >
        </label>
        <label>
          ZIP Code
          <br>
          <input type="text" v-model="form.zip" >
        </label>
        <label>
          Country
          <br>
          <select v-model="form.country" >
            <option :value="country" v-for="(country, index) in countries" :key="index">{{ country }}</option>
          </select>
        </label>
        <small>By clicking "Book" you accept that you are not actually booking a ticket as this is a test project and not a real website</small>
        <button style="padding: 16px; font-size: 16px;" @click="book">Book</button>
      </section>
    </div>
  </main>
</template>

<script>
import PageTitle from "@/components/PageTitle.vue";

export default {
  components: {PageTitle},
  data () {
    return {
      concert: null,
      seating: [],
      details: false,
      selectedSeats: [],
      countries: [
        'Albania',
        'Andorra',
        'Armenia',
        'Austria',
        'Azerbaijan',
        'Belarus',
        'Belgium',
        'Bosnia and Herzegovina',
        'Bulgaria',
        'Croatia',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Estonia',
        'Finland',
        'France',
        'Georgia',
        'Germany',
        'Greece',
        'Hungary',
        'Iceland',
        'Ireland',
        'Italy',
        'Kazakhstan',
        'Kosovo',
        'Latvia',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Malta',
        'Moldova',
        'Monaco',
        'Montenegro',
        'Netherlands',
        'North Macedonia',
        'Norway',
        'Poland',
        'Portugal',
        'Romania',
        'Russia',
        'San Marino',
        'Serbia',
        'Slovakia',
        'Slovenia',
        'Spain',
        'Sweden',
        'Switzerland',
        'Turkey',
        'Ukraine',
        'United',
        'Vatican City'
      ],
      reservation: {
        reservation_token: null,
        reservations: []
      },
      form: {
        name: null,
        address: null,
        zip: null,
        country: null
      }
    }
  },
  mounted () {
    this.concert = JSON.parse(localStorage.getItem('concert'))

    this.axios.get(`/concerts/${this.concert.id}/shows/${this.concert.shows[0].id}/seating`).then((response) => {
      this.seating = response.data
    })
  },
  methods: {
    book () {
      let data = this.form
      data.push({reservation_token: this.reservation.reservation_token})
      this.axios.post(`/concerts/${this.concert.id}/shows/${this.concert.shows[0].id}/booking`, data).then((response) => {
      })
    },
    selectSeat(event, row, seat) {
      event.target.classList.add('seat-selected')
      const le = this.selectedSeats.length
      this.selectedSeats.map((row1, index) => {
        if (row1.row === row && row1.seat === seat) {
          this.selectedSeats.splice(index, 1)
          event.target.classList.remove('seat-selected')
        }
      })
      if(this.selectedSeats.length === le) {
        this.selectedSeats.push({row: row, seat: seat})
      }

      this.reservation.reservations = []
      this.selectedSeats.map((row1) => {
        this.reservation.reservations.push({
          row: row1.row.id,
          seat: row1.seat
        })
      })

      this.axios.post(`/concerts/${this.concert.id}/shows/${this.concert.shows[0].id}/reservation`, this.reservation).then((response) => {
        this.reservation.reservation_token = response.data.reservation
      })
    }
  }
}
</script>


<style scoped>
.card {
    border: 1px solid gray;
    padding: 16px;
    border-radius: 10px;
    max-width: 200px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.seats-container, .details {
    display: flex;
    align-items: center;
    justify-content: stretch;
    flex-direction: column;
    margin-right: auto;
    margin-left: auto;
    gap: 10px;
}

.details {
    margin-top: 50px;
}

.seats {
    display: flex;
    gap: 50px;
}

.seats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.seat-available {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #b4b4b4;
    cursor: pointer;
}

.stage {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: gray;
    color: white;
    width: 300px;
    height: 100px;
    border-radius: 20px;
    margin: 100px auto 50px;
}

.seat-unavailable {
    cursor: none !important;
    background-color: #757575;
    user-select: none;
}

.seat-selected {
    background-color: #2aa8ff;
}

.selected-seats {
    margin: 50px auto 10px;
    text-align: center;
}

</style>
