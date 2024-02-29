var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Grupo = /** @class */ (function () {
    function Grupo(nombre) {
        this.nombre = nombre;
        this.miembros = [];
    }
    Grupo.prototype.agregarMiembro = function (miembro) {
        this.miembros.push(miembro);
    };
    Grupo.prototype.obtenerMiembros = function () {
        return this.miembros;
    };
    return Grupo;
}());
var GeneradorDeGrupos = /** @class */ (function () {
    function GeneradorDeGrupos() {
        this.grupos = [];
    }
    GeneradorDeGrupos.prototype.generarGruposAleatorios = function (miembros, numeroGrupos) {
        var copiaMiembros = __spreadArray([], miembros, true);
        this.grupos = [];
        for (var i = 0; i < numeroGrupos; i++) {
            var nombreGrupo = "Grupo ".concat((i + 1).toString());
            var nuevoGrupo = new Grupo(nombreGrupo);
            while (nuevoGrupo.obtenerMiembros().length < miembros.length / numeroGrupos) {
                var indiceAleatorio = Math.floor(Math.random() * copiaMiembros.length);
                var miembroAleatorio = copiaMiembros.splice(indiceAleatorio, 1)[0];
                nuevoGrupo.agregarMiembro(miembroAleatorio);
            }
            this.grupos.push(nuevoGrupo);
        }
    };
    GeneradorDeGrupos.prototype.obtenerGrupos = function () {
        return this.grupos;
    };
    return GeneradorDeGrupos;
}());
var generador = new GeneradorDeGrupos();
generador.generarGruposAleatorios(["Juan", "Pedro", "María", "Ana", "Luis", "Sofía"], 3);
var grupos = generador.obtenerGrupos();
console.log(grupos);
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form');
    var output = document.getElementById('output');
    var addParticipantButton = document.getElementById('addParticipant');
    var participantsContainer = document.getElementById('participantsContainer');
    var participantCounter = 0;
    addParticipantButton.addEventListener('click', function () {
        participantCounter++;
        var newParticipantInput = document.createElement('input');
        newParticipantInput.type = 'text';
        newParticipantInput.id = "participant".concat(participantCounter.toString());
        newParticipantInput.name = "participant".concat(participantCounter.toString());
        newParticipantInput.placeholder = "Nombre del participante ".concat(participantCounter.toString());
        participantsContainer.appendChild(newParticipantInput);
        participantsContainer.appendChild(document.createElement('br'));
    });
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var participants = [];
        for (var i = 1; i <= participantCounter; i++) {
            var input = document.getElementById("participant".concat(i.toString()));
            if (input instanceof HTMLInputElement && input.value.trim() !== '') {
                participants.push(input.value.trim());
            }
        }
        var numberOfGroups = 3;
        generador.generarGruposAleatorios(participants, numberOfGroups);
        var groups = generador.obtenerGrupos();
        output.innerHTML = '';
        groups.forEach(function (group, index) {
            var groupElement = document.createElement('div');
            groupElement.innerHTML = "<strong>Grupo ".concat((index + 1).toString(), ":</strong> ").concat(group.miembros.join(', '));
            output.appendChild(groupElement);
        });
    });
});
