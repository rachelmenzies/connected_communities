(() => {
  const list = document.getElementById("updates-list");
  const searchInput = document.getElementById("updates-search");
  const sortSelect = document.getElementById("updates-sort");
  const tagsContainer = document.getElementById("updates-tags");
  const emptyState = document.getElementById("updates-empty");

  if (!list || !searchInput || !sortSelect || !tagsContainer) {
    return;
  }

  const cards = Array.from(list.querySelectorAll(".blog-card"));
  const cardTags = new Map();

  const getCardDate = (card) => {
    const raw = card.dataset.created || "";
    const parsed = Date.parse(raw);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const getCardTags = (card) => {
    return Array.from(card.querySelectorAll(".blog-tag"))
      .map((tag) => tag.textContent.trim().toLowerCase())
      .filter(Boolean);
  };

  const getCardText = (card) => {
    return card.textContent.toLowerCase();
  };

  const allTags = Array.from(
    new Set(
      cards.flatMap((card) => {
        const tags = getCardTags(card);
        cardTags.set(card, tags);
        return tags;
      })
    )
  ).sort((a, b) => a.localeCompare(b));

  allTags.forEach((tag) => {
    const label = document.createElement("label");
    label.className = "blog-tag-option";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = tag;
    input.addEventListener("change", applyFiltersAndSort);

    const text = document.createElement("span");
    text.textContent = tag;

    label.appendChild(input);
    label.appendChild(text);
    tagsContainer.appendChild(label);
  });

  const getSelectedTags = () => {
    return Array.from(
      tagsContainer.querySelectorAll('input[type="checkbox"]:checked')
    ).map((input) => input.value);
  };

  function applyFiltersAndSort() {
    const query = searchInput.value.trim().toLowerCase();
    const sortMode = sortSelect.value;
    const selectedTags = getSelectedTags();

    cards.forEach((card) => {
      const matchesQuery = query === "" || getCardText(card).includes(query);
      const tags = cardTags.get(card) || [];
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((selectedTag) => tags.includes(selectedTag));
      card.hidden = !(matchesQuery && matchesTags);
    });

    const visibleCards = cards.filter((card) => !card.hidden);

    visibleCards.sort((a, b) => {
      if (sortMode === "oldest") {
        return getCardDate(a) - getCardDate(b);
      }
      return getCardDate(b) - getCardDate(a);
    });

    visibleCards.forEach((card) => {
      list.appendChild(card);
    });

    if (emptyState) {
      emptyState.hidden = visibleCards.length > 0;
    }
  }

  searchInput.addEventListener("input", applyFiltersAndSort);
  sortSelect.addEventListener("change", applyFiltersAndSort);

  applyFiltersAndSort();
})();
