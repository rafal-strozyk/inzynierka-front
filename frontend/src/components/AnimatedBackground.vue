<template>
  <div class="bg-container">
    <div v-for="_ in 25" class="rainbow" />
    <div class="h" />
    <div class="v" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
$purple: rgb(110 110 110);
$blue: rgb(50 50 50);
$green: rgb(80 80 80);

$animationtime: 90s;
$length: 25;

.bg-container {
  --background-color: var(--color-gray-50);

  &:is(.dark *) {
    --background-color: var(--color-gray-900);
  }

  .rainbow {
    height: 100vh;
    width: 0;
    top: 0;
    position: absolute;
    transform: rotate(10deg);
    transform-origin: top right;

    @for $i from 1 through $length {
      &:nth-child(#{$i}) {
        $colors: 0;
        $r: random(6);
        @if $r == 1 {
          $colors: $purple, $blue, $green;
        }
        @elseif $r == 2 {
          $colors: $purple, $green, $blue;
        }
        @elseif $r == 3 {
          $colors: $green, $purple, $blue;
        }
        @elseif $r == 4 {
          $colors: $green, $blue, $purple;
        }
        @elseif $r == 5 {
          $colors: $blue, $green, $purple;
        }
        @elseif $r == 6 {
          $colors: $blue, $purple, $green;
        }
        box-shadow:
          -130px 0 80px 40px var(--background-color),
          -50px 0 50px 25px nth($colors, 1),
          0 0 50px 25px nth($colors, 2),
          50px 0 50px 25px nth($colors, 3),
          130px 0 80px 40px var(--background-color);
        animation: #{calc($animationtime - $animationtime / $length / 2 * $i)}
          linear
          infinite
          slide;
        animation-delay: -#{calc($i / $length * $animationtime)};
      }
    }
  }
  @keyframes slide {
    from {
      right: -25vw;
    }
    to {
      right: 125vw;
    }
  }
  .h {
    box-shadow: 0 0 50vh 40vh var(--background-color);
    width: 100vw;
    height: 0;
    bottom: 0;
    left: 0;
    position: absolute;
  }
  .v {
    box-shadow: 0 0 35vw 25vw var(--background-color);
    width: 0;
    height: 100vh;
    bottom: 0;
    left: 0;
    position: absolute;
  }
}
</style>
