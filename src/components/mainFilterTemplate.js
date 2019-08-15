export const mainFilter = (data) => {
  const filters = Object.entries(data).map((it) => `<input
    type="radio"
    id="filter__${it[0]}"
    class="filter__input visually-hidden"
    name="filter"
    checked
  />
  <label for="filter__all" class="filter__label">
    ${it[0]} <span class="filter__all-count">${it[1]}</span></label
  >`).join(``);

  return `<section class="main__filter filter container">
    ${filters}
  </section>`;
};
