<template>
 <div class="movies-panel">
  <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
   <div class="d-flex justify-content-between">
    <div>
     <h3>To-Do-List</h3>
    </div>
    <div>
     <button class="btn btn-sm btn-primary" v-b-modal.modal-new-movie>Add New</button>
    </div>
   </div>
   <div class="card p-3">
    <table class="table table-hover table-responsive">
     <thead>
      <tr>
       <th scope="col">Title</th>
       <th scope="col">Description</th>
       <th scope="col">Date Added</th>
       <th scope="col">Options</th>
      </tr>
     </thead>
     <tbody>
      <tr :class="t.status == 'completed' ? 'text-decoration-line-through' : ''" v-for="(t, i) in task" :key="i">
       <td>{{ t.title }}</td>
       <td>{{ t.description }}</td>
       <td>{{ t.created_at | moment }}</td>
       <td class="pt-1">
        <button v-if="t.status == 'pending'" class="btn btn-sm btn-success me-2" v-b-modal.modal-done-movie @click="sendInfo(t)">Done</button>
        <button v-if="t.status == 'completed'" class="btn btn-sm btn-warning me-2 text-light" v-b-modal.modal-redo-movie @click="sendInfo(t)">Undone</button>
        <button class="btn btn-sm btn-primary me-2" v-b-modal.modal-edit-movie @click="sendInfo(t)">Edit</button>
        <button class="btn btn-sm btn-danger" v-b-modal.modal-delete-movie @click="sendInfo(t)">Delete</button>
       </td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
  <b-modal id="modal-new-movie" hide-header-close centered title="Add New Movie">
   <div class="mb-3">
    <label class="form-label">Title</label>
    <input v-model="data.title" type="text" class="form-control" />
   </div>
   <div class="mb-3">
    <label class="form-label">Description</label>
    <input v-model="data.description" type="text" class="form-control" />
   </div>
   <template #modal-footer="{ cancel }">
    <b-button size="sm" variant="danger" @click="cancel()"> Cancel </b-button>
    <b-button size="sm" variant="primary" @click="saveTask"> Add Task </b-button>
   </template>
  </b-modal>
  <b-modal id="modal-edit-movie" hide-header-close centered title="Edit Task">
   <div class="mb-3">
    <label class="form-label">Title</label>
    <input v-model="edit.title" type="text" class="form-control" />
   </div>
   <div class="mb-3">
    <label class="form-label">Description</label>
    <input v-model="edit.description" type="text" class="form-control" />
   </div>
   <template #modal-footer="{ cancel }">
    <b-button size="sm" variant="danger" @click="cancel()"> Cancel </b-button>
    <b-button size="sm" variant="primary" @click="updateTask"> Edit Task </b-button>
   </template>
  </b-modal>
  <b-modal id="modal-delete-movie" hide-header-close centered title="Delete Task">
   <p>Are you sure you want to delete this task?</p>
   <template #modal-footer="{ cancel }">
    <b-button size="sm" variant="primary" @click="cancel()"> Cancel </b-button>
    <b-button size="sm" variant="danger" @click="del"> Delete Task </b-button>
   </template>
  </b-modal>
  <b-modal id="modal-done-movie" hide-header-close centered title="Complete Task">
   <p>Are you sure you want to finish this task?</p>
   <template #modal-footer="{ cancel }">
    <b-button size="sm" variant="primary" @click="cancel()"> Cancel </b-button>
    <b-button size="sm" variant="success" @click="complete"> Confirm </b-button>
   </template>
  </b-modal>
  <b-modal id="modal-redo-movie" hide-header-close centered title="Redo Task">
   <p>Are you sure you want to redo this task?</p>
   <template #modal-footer="{ cancel }">
    <b-button size="sm" variant="primary" @click="cancel()"> Cancel </b-button>
    <b-button size="sm" variant="success" @click="redo"> Confirm </b-button>
   </template>
  </b-modal>
 </div>
</template>

<script>
 import { mapState } from 'vuex';
 import moment from 'moment';
 export default {
  data() {
   return {
    data: {
     title: '',
     description: '',
    },
    edit: {
     title: '',
     description: '',
    },
   };
  },
  created() {
   this.getAllTasks();
  },
  filters: {
   moment: function (date) {
    return moment(date).format('MMMM DD, YYYY');
   },
  },
  computed: {
   ...mapState('auth', ['task']),
  },
  methods: {
   async getAllTasks() {
    await this.$store.dispatch('auth/getAllTasks');
   },
   async saveTask() {
    if (this.data.title == '' && this.data.description == '') return this.$toast.info('Please fill in all fields');
    if (this.data.title == '') return this.$toast.info('Task title is required');
    if (this.data.description == '') return this.$toast.info('Task description is required');

    const res = await this.$store.dispatch('auth/saveTask', this.data);
    if (res.status == 200) {
     this.getAllTasks();
     this.$toast.success('Task added!');
     this.$bvModal.hide('modal-new-movie');
     this.data.title = '';
     this.data.description = '';
    }
   },
   async updateTask() {
    if (this.edit.title == '' && this.edit.description == '') return this.$toast.info('Please fill in all fields');
    if (this.edit.title == '') return this.$toast.info('Task title is required');
    if (this.edit.description == '') return this.$toast.info('Task description is required');

    const res = await this.$store.dispatch('auth/updateTask', { id: this.edit.id, payload: this.edit });
    if (res.status == 200) {
     this.getAllTasks();
     this.$toast.success('Task updated!');
     this.$bvModal.hide('modal-edit-movie');
     this.edit.title = '';
     this.edit.description = '';
    }
   },
   async complete() {
    const res = await this.$store.dispatch('auth/completeTask', this.edit.id);
    if (res.status == 200) {
     this.getAllTasks();
     this.$toast.success('Task completed!');
     this.$bvModal.hide('modal-done-movie');
    }
   },
   async redo() {
    const res = await this.$store.dispatch('auth/redoTask', this.edit.id);
    if (res.status == 200) {
     this.getAllTasks();
     this.$toast.success('Task redo!');
     this.$bvModal.hide('modal-redo-movie');
    }
   },
   async del() {
    const res = await this.$store.dispatch('auth/deleteTask', this.edit.id);
    if (res.status == 200) {
     this.getAllTasks();
     this.$toast.success('Task deleted!');
     this.$bvModal.hide('modal-delete-movie');
    }
   },
   sendInfo(t) {
    this.edit.id = t.id;
    this.edit.title = t.title;
    this.edit.description = t.description;
   },
  },
 };
</script>
