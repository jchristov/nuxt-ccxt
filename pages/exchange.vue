<template>
  <div>
    <v-btn fab dark color="primary" @click="handleOrderBooks">
      <v-icon dark v-if="!toggle">play_arrow</v-icon>
      <v-icon dark v-else>pause</v-icon>
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.bid }}</td>
        <td class="text-xs-right">{{ props.item.ask }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      headers: [
        {text: '取引所', align: 'left', sortable: true, value: 'name'},
        {text: 'bid', align: 'right', sortable: false, value: 'bid'},
        {text: 'ask', align: 'right', sortable: false, value: 'ask'}
      ],
      toggle: false
    }
  },
  computed: {
    ...mapGetters('ccxt', ['exchanges', 'orderbooks']),
    items () {
      let items = this.orderbooks.map(el => ({
        name: el.name,
        bid: el.bids[0][0],
        ask: el.asks[0][0]
      }))
      return items
    }
  },
  methods: {
    ...mapActions('ccxt', ['startGetOrderbooks', 'stopGetOrderbooks']),
    handleOrderBooks () {
      this.toggle = !this.toggle
      if (this.toggle) {
        this.startGetOrderbooks()
      } else {
        this.stopGetOrderbooks()
      }
    }
  },
  mounted () {
    console.log('exchange mounted store %o', this.$store)
  }
}
</script>

