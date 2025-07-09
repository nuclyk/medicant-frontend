<script>
    import { stats } from "$lib/lang/en";

    let { data } = $props();

    let checked_in = $derived(data.stats.checked_in);

    let leavingToday = $derived(data.stats.leaving_today);
    let arrivedToday = $derived(data.stats.arrived_today);
    let male = $derived(data.stats.males);
    let female = $derived(data.stats.females);
    let veg = $derived(data.stats.vegetarian);
    let volunteers = $derived(data.stats.volunteers);
</script>

{#snippet col(title, desc)}
    <div class="col">
        <div class="row g-2">
            <div class="col border rounded p-2">
                <h5 class="display-5">{title}</h5>
                <h2 class="display-2">{desc}</h2>
            </div>
        </div>
    </div>
{/snippet}

<div class="container text-center flex-nowrap text-nowrap mt-3">
    <div class="row g-4">
        {@render col("รวมผู้เข้าร่วม", checked_in)}
        {@render col(
            "ผู้เข้าร่วม/อาสาสมัคร",
            checked_in - volunteers + " / " + volunteers,
        )}
        {@render col("ชาย / หญิง", male + " / " + female)}
        {@render col("มาถึงแล้ววันนี้", arrivedToday)}
        {@render col("ออกเดินทางวันนี้", leavingToday)}
        {@render col(
            "มังสวิรัติ / เนื้อสัตว์",
            veg + " / " + (checked_in - veg),
        )}
    </div>
</div>
