if (Meteor.isClient) {
  // This code is executed on the client only
  
  Meteor.subscribe('tasks');

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("tasks", function () {
    return tasks.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
}

