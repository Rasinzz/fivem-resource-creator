$(() => {
    window.addEventListener('message', async (event) => {
        if (event.data.type === 'hide') {
            $('.container').addClass('hidden');
        }

        if (event.data.type === 'show') {
            $('.container').removeClass('hidden');
        }
    });
});
