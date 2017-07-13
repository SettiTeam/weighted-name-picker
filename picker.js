/* globals Vue */

var storage = {
    fetch: function() {
        var people = JSON.parse(localStorage.getItem('ivy-envy') || '[]');
        return people;
    },
    save: function(people) {
        localStorage.setItem('ivy-envy', JSON.stringify(people));
    }
};

var data = {
    people: storage.fetch(),
    nameInput: null,
    entriesInput: null,
    winner: null
};

var app = new Vue({
    el: '#js-app',
    data: data,
    methods: {
        addPerson: function() {
            if (!data.nameInput) { return; }
            if (!data.entriesInput) { return; }
            if (isNaN(data.entriesInput)) { return; }

            data.people.push({
                name: data.nameInput,
                entries: data.entriesInput
            });

            data.nameInput = data.entriesInput = null;
        },
        removePerson: function(index) {
            data.people.splice(index, 1);
        },
        pickWinner: function() {
            var entries = [];

            data.people.forEach(function(person) {
                for (var i = 0; i < person.entries; i++) {
                    entries.push(person.name);
                }
            });

            data.winner = entries[Math.floor(Math.random() * entries.length)];
        },
        calculateChance: function(person) {
            var total = 0;

            data.people.forEach(function(p) {
                total += parseInt(p.entries);
            });

            var percentage = Math.round(parseInt(person.entries) / total * 100);
            return percentage + '%';
        }
    },
    watch: {
        people: {
            handler: function(people) {
                storage.save(people);
            },
            deep: true
        }
    }
});
