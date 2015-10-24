tasks = new Mongo.Collection('tasks');

astroTask = Astro.Class( {
	name: 'astroTask',
	collection: tasks,
	fields: {
		text: 'string',
		createdAt: {
			type: 'date',
			default: function() {
				return new Date().toISOString();
			}
		},
		owner: {
			type: 'string',
			default: function() {
				return Meteor.userId();
			}
		},
		username: {
			type: 'string',
			default: function() {
				return Meteor.user() && Meteor.user().username;
			}
		},
		private: 'boolean',
		checked: 'boolean'
	}
} );

if (Meteor.isServer) {

	function ownsDocument( userId, doc ) {
		if( doc && doc.private != true ) {
			return true;
		}
		return doc && userId && ( doc.owner === userId );
	}

	tasks.allow( {
		insert: ownsDocument,
		update: ownsDocument,
		remove: ownsDocument
	} );
}