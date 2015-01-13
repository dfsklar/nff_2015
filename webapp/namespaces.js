window.nfforg = {};
window.nfforg.renderers = {};

window.nfforg.getUrlVars = function()
{
  var vars = {}, hash;
  var locQuest = window.location.href.indexOf('?');
  if (locQuest < 0)
    return vars;

  // ---------------------

  var hashes = window.location.href.slice(locQuest + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars[hash[0]] = hash[1];
  }
  return vars;
}


window.nfforg.queryParams = window.nfforg.getUrlVars();
