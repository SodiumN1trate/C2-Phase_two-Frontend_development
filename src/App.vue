<template>
  <header>
    <h2>EuroSkills Concerts</h2>
    <div>
      <a href="/">Already booked?  </a>
      <button>Get tickets</button>
    </div>
  </header>
  <RouterView />
</template>
<style>
input, select {
    padding: 8px;
    font-size: 16px;
}

header {
    height: 60px;
    background-color: #656565;
    color: white;
    padding-left: 50px;
    padding-right: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header a,  header a:visited {
    color: white;
}

header a:hover {
    text-decoration: underline;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
