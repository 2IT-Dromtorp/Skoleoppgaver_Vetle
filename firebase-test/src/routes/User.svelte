<script>
    import { afterUpdate, onMount } from "svelte";
    import { navigate } from "svelte-routing";

    let top = 0
    let left = 0
    let size = 1

    $: dots = [{}]

    afterUpdate(() => {
        if (!localStorage.getItem("jwt")) {
            navigate("/login")
        }
    })

    onkeydown = (e) => {
        e.preventDefault()
        switch (e.key){
            case "w":
                top -= 10
                break
            case "a":
                left -= 10
                break
            case "s":
                top += 10
                break
            case "d":
                left += 10
                break
            case "+":
                size += 2
                break
            case "-":
                size += -2
                break
            default:
                break
        }
        $dots({top: top, left: left, size: size})
    }

    function handleClick() {
        // localStorage.removeItem("jwt")
    }

    function handleDoubleClick(e) {
        console.log("aight, jeg ble dobbeltrykket")
    }
</script>

{#if localStorage.getItem("jwt")}
{#each $dots as dot}
    {console.log(dot)}
    <div class="dot" style="top:{dot.top};left:{dot.left};width:{dot.size};height:{dot.size};" />
{/each}
<div id="dot" style="--top:{left};--left:{top}; --size:{size}"></div>
{/if}

<style>
    #dot {
        width: calc(1px * var(--size));
        height: calc(1px * var(--size));
        border-radius: 100%;
        background-color: red;
        position: absolute;
        top: calc( var(--left) * 1px);
        left: calc( var(--top) * 1px);
    }
    .dot {
        background-color: red;
        position: absolute;
        border-radius: 100%;
    }
</style>