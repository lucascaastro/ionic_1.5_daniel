angular.module('starter.services', [])
.factory('tarefasService', function($http){

  function getTasks(){
    return $http.get("http://localhost:3000/consulta");
  }

  function addTasks(dados){
    return $http.post("http://localhost:3000/insere", dados);
  }
  function alterTasks(dados) {
    return $http.put("http://localhost:3000/atualiza", dados);
  }
  function deleteTasks(dados) {
    return $http.delete("http://localhost:3000/remove/" + dados.id_tarefa);
  }
  return {
    getTasks: getTasks,
    addTasks: addTasks,
    alterTasks: alterTasks,
    deleteTasks: deleteTasks
  };

});
