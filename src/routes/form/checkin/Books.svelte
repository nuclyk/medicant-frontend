<script>
    import blocks from "$lib/assets/images/blocks.png";
    import cleanse from "$lib/assets/images/cleanse.png";
    import inspiration from "$lib/assets/images/inspiration.png";
</script>

<div class="col-lg-8 col-xl-8 col-xxl-6 mx-auto">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Take your books</h5>
            <p class="card-text">
                Those books are written by Nick Keomahavong, a monk from Pa Pae
                Meditation center.
            </p>
            <p class="card-text">
                It will give you all the tips to discover and practice the
                middle way meditation. If you have never meditated before, we
                suggest you to read them, particularly the Building Blocks of
                Meditation (blue book).
            </p>
            <p class="card-text">
                You can then keep them even after the retreat.
            </p>
        </div>
        <div class="card-body w-75 mx-auto">
            <figure class="figure border rounded p-3">
                <img
                    src={blocks}
                    class="figure-img img-fluid rounded"
                    alt="Building block of meditation"
                />
                <figcaption class="figure-caption">
                    Building blocks of meditaiton
                </figcaption>
            </figure>

            <figure class="figure border rounded p-3">
                <img
                    src={cleanse}
                    class="figure-img img-fluid rounded"
                    alt="the budhist cleanse"
                />
                <figcaption class="figure-caption">
                    The Budhist Cleanse
                </figcaption>
            </figure>

            <figure class="figure border rounded p-3">
                <img
                    src={inspiration}
                    class="figure-img img-fluid rounded"
                    alt="inspirational meditation"
                />
                <figcaption class="figure-caption">
                    Inspirational meditation for beginners
                </figcaption>
            </figure>
        </div>
    </div>
</div>
