<template>
<div class="container">
    <div class="table-wrapper">
      <div class="table-title">
        <div class="row">
          <div class="col-sm-8"><h2>Compras</h2></div>
          <div class="col-sm-4">
            <button type="button" class="btn btn-info add-new" @click="$router.push('/new')">
                <i class="fa fa-plus"></i> Nuevo
            </button>
          </div>
        </div>
      </div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th width="3%">ID</th>
            <th width="10%">Fecha</th>
            <th width="20%">Título</th>
            <th width="10%">Tienda</th>
            <th width="25%">Lista</th>
            <th width="25%">Comentarios</th>
            <th width="7%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="compra in compras" :key="compra.id">
            <td>{{ compra.id }}</td>
            <td>{{ compra.fecha }}</td>
            <td>{{ compra.titulo }}</td>
            <td>{{ compra.tienda }}</td>
            <td>{{ compra.lista }}</td>
            <td>{{ compra.comentarios }}</td>
            <td>
                <a class="edit" title="Edit" data-toggle="tooltip" @click.prevent="irAEditar(compra.id)">
                    <i class="fa fa-edit"></i>
                </a>
                <a class="delete" title="Delete" data-toggle="tooltip" @click="eliminarCompra(compra.id)" >
                    <i class="fa fa-trash"></i>
                </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { load } from '../services/api'; // <-- importamos la función de api.ts
import { remove } from '../services/api'; // <-- importamos la función de api.ts
import type { Compra } from '../interfaces/interfaces'
import Swal from 'sweetalert2';

const router = useRouter();

const compras = ref<Compra[]>([]);
const user = JSON.parse(localStorage.getItem('user') || '{}');



// Cargar compras
const cargarCompras = async () => {
  if (!user.username) return;
  try {
    compras.value = await load(user.username);
  } catch (err) {
    console.error('Error al cargar compras:', err);
    await Swal.fire('Error', 'Error al cargar compras', 'error');
  }
};

const irAEditar = (id: number) => {
  router.push(`/edit/${id}`);
};

// Eliminar compra
const eliminarCompra = async (id: number) => {
    const result = await Swal.fire({
        title: '¿Eliminar compra?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
  });
  if (!result.isConfirmed) return;
  try {
    await remove(id);
    compras.value = compras.value.filter(c => c.id !== id);
    await Swal.fire("Èxito","Compra eliminada correctamente","success");
  } catch (err) {
    await Swal.fire("Error", "Error al eliminar la compra","error");
  }
};

onMounted(() => {
  cargarCompras();
});
</script>


<style scoped>
   body {
        color: #404E67;
        background: #F5F7FA;
		font-family: 'Open Sans', sans-serif;
	}
	.table-wrapper {
		width: 100%;
		margin: 30px auto;
        background: #fff;
        padding: 20px;	
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
    }
    .table-title {
        padding-bottom: 10px;
        margin: 0 0 10px;
    }
    .table-title h2 {
        margin: 6px 0 0;
        font-size: 22px;
    }
    .table-title .add-new {
        float: right;
		height: 30px;
		font-weight: bold;
		font-size: 12px;
		text-shadow: none;
		min-width: 100px;
		border-radius: 50px;
		line-height: 13px;
    }
	.table-title .add-new i {
		margin-right: 4px;
	}
    table.table {
        table-layout: fixed;
    }
    table.table tr th, table.table tr td {
        border-color: #e9e9e9;
    }
    table.table th i {
        font-size: 13px;
        margin: 0 5px;
        cursor: pointer;
    }
    table.table td a {
		cursor: pointer;
        display: inline-block;
        margin: 0 5px;
		min-width: 24px;
    }    
	table.table td a.add {
        color: #27C46B;
    }
    table.table td a.edit {
        color: #FFC107;
    }
    table.table td a.delete {
        color: #E34724;
    }
    table.table td i {
        font-size: 19px;
    }
	table.table td a.add i {
        font-size: 24px;
    	margin-right: -1px;
        position: relative;
        top: 3px;
    }    
    table.table .form-control {
        height: 32px;
        line-height: 32px;
        box-shadow: none;
        border-radius: 2px;
    }
	table.table .form-control.error {
		border-color: #f50000;
	}
	table.table td .add {
		display: none;
	}

</style>