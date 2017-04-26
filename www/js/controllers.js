angular.module('starter.controllers', ['starter.services'])

.controller('HomeCtrl', function($scope, $rootScope, tarefasService,$ionicPopup,$ionicListDelegate) {

  $rootScope.exibirFinalizadas = false;
  $scope.removeStatus = false;

  function carregaLista() {
      tarefasService.getTasks()
      .then(function(res){
        $scope.lista = res.data;
      });
  }

  carregaLista();

  function getItem(item, novo){
    $scope.data = item;
    if(!novo){
      var d = $scope.data.dt_tarefa.split("-");
      $scope.data.dt_tarefa = new Date(d[2].split("T")[0] +"/"+d[1]+"/"+d[0]);
    }
    $scope.data.newTask = item.nome;

    $ionicPopup.show({
      title:"Nova Tarefa",
      scope: $scope,
      template: "<input type='text' placeholder='Tarefa' autofocus='true' ng-model='data.nome'>"+
                "<input type='text' placeholder='Descricao' ng-model='data.descricao'>"+
                "<input type='date' placeholder='11/04/2017' ng-model='data.dt_tarefa'>",
      buttons:[
        {text: "Ok",
        onTap: function(e){
          item.nome = $scope.data.nome;
          item.descricao = $scope.data.descricao;
          item.dt_tarefa = $scope.data.dt_tarefa;
          item.finalizado = $scope.data.finalizado || false;
          if(novo){
            tarefasService.addTasks(item).then(function(res){
              carregaLista();
            })
          }
          else {
            tarefasService.alterTasks(item).then(function(res){
              carregaLista();
            })
          }
        }},
        {text: "Cancelar"}
      ]
    });
    $ionicListDelegate.closeOptionButtons();
  };

  $scope.select = function(item) {
    item.finalizado = !item.finalizado;
    console.log(item);
    tarefasService.alterTasks(item).then(function(res){
      carregaLista();
    })
  };

  $scope.exibir = function(item) {
    if(item.finalizado && !$rootScope.exibirFinalizadas) return true;
  };

  $scope.onItemremove = function(item){
    tarefasService.deleteTasks(item)
    .then(function(res){
      carregaLista();
    });
  }

  $scope.onClickRemove = function(item){
    $scope.removeStatus = !$scope.removeStatus;
  };

  $scope.onItemAdd = function() {
    var item = {};
    getItem(item, true);
  };

  $scope.onItemEdit = function(item) {
   getItem(item, false);
  };

})

.controller('AboutCtrl', function($scope) {

})
