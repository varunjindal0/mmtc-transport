App.requirements = App.cable.subscriptions.create "RequirementsChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    debugger
    cableUpdate(data.requirement_to_render)

    $("#RequirementArea").append data.requirement_to_render
