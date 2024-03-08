<script>
    import { afterUpdate, onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { writable } from "svelte/store";

    let top = 0;
    let left = 0;
    let size = 1;

    const dots = writable([{}]);

    afterUpdate(() => {
        if (!localStorage.getItem("jwt")) {
            navigate("/login");
        }
    });

    onkeydown = (e) => {
        e.preventDefault();
        switch (e.key) {
            case "w":
                top -= 10;
                break;
            case "a":
                left -= 10;
                break;
            case "s":
                top += 10;
                break;
            case "d":
                left += 10;
                break;
            case "+":
                size += 2;
                break;
            case "-":
                size += -2;
                break;
            default:
                break;
        }
        dots.update((prev) => [...prev, { top: top, left: left, size: size }]);
    };

    function handleClick() {
        // localStorage.removeItem("jwt")
    }

    function handleDoubleClick(e) {
        console.log("aight, jeg ble dobbeltrykket");
    }
</script>

{#if localStorage.getItem("jwt")}
    {#each $dots as dot}
        <div
            class="dot"
            style="top:calc({dot.top} * 1px);left:calc({dot.left} * 1px);width:calc({dot.size} * 1px);height:calc({dot.size} * 1px);"
        ></div>
    {/each}
    <div id="dot" style="--top:{left};--left:{top}; --size:{size}"></div>
{/if}

<style>
    #dot {
        width: calc(1px * var(--size));
        height: calc(1px * var(--size));
        border-radius: 100%;
        background-color: lime;
        position: absolute;
        top: calc(var(--left) * 1px);
        left: calc(var(--top) * 1px);
    }
    .dot {
        background-color: red;
        position: absolute;
        border-radius: 100%;
    }
</style>
