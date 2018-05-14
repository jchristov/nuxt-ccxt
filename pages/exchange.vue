<template>
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
</template>

<script>
import getItems from '~/plugins/doworker'
export default {
  data () {
    return {
      timeout: 3 * 1000,
      headers: [
        {text: '取引所', align: 'left', sortable: true, value: 'name'},
        {text: 'bid', align: 'right', sortable: false, value: 'bid'},
        {text: 'ask', align: 'right', sortable: false, value: 'ask'}
      ],
      items: []
    }
  },
  methods: {
    async getItems () {
      this.items = await getItems()
      setTimeout(() => {
        this.getItems()
      }, this.timeout)
    }
  },
  mounted () {
    this.getItems()
  }
}
</script>

