chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: false }, () => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });
});


async function updateStaticRules(enableRulesetIds, disableRulesetIds) {
  await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: enableRulesetIds,
      disableRulesetIds: disableRulesetIds
  });
}

chrome.action.onClicked.addListener(async () => {
  await chrome.storage.local.get(['enabled'], async (result) => {
    enabled = !(result.enabled);
    chrome.storage.local.set({ enabled: enabled})
    
    // update static rules
    if (enabled) {
      await updateStaticRules(["ruleset_1"], []);
    } else {
      await updateStaticRules([], ["ruleset_1"]);
    }

    // update the badge status
    const state = enabled ? '' : 'OFF';
    chrome.action.setBadgeText({
      text: state,
    });
  })
});
