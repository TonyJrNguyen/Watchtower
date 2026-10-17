// The only script the static pages need: HTML can't mark a checkbox as indeterminate.
for (const box of document.querySelectorAll("[data-indet]")) box.indeterminate = true;
