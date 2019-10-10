$('textarea').on('input', function() {
  $(this)
    .height(36)
    .height(this.scrollHeight);
});

const postTemplate = (post, timestamp) =>
`
<div class="post-create card">
<div class="card-body">
  ${post}
  <span class="float-right timestamp">
    ${timestamp}
  </span>
</div>
</div>
`
const posts = $('.posts');
const postInput = $('.post-input');
const emptyError = $('#empty-input');

const apiURL = 'https://esfox-boared.glitch.me/api';

(async () =>
{
  const posts = await fetch(apiURL)
    .then(response => response.json());

  for(const post of posts.reverse())
    addPost(post);
})();

$('.post-confirm').on('click', async () =>
{
  const postContent = postInput.val();
  if(!postContent)
    return emptyError.modal('show');

  postInput.val('');
  await fetch(apiURL,
  {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post: postContent }),
  }).then(response => response.json());

  window.location.reload();
});

function addPost({ content, createdAt })
{
  const time = new Date(createdAt);
  createdAt = `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`
    + ` ${time.getHours()}:${time.getMinutes()}`;
  posts.append(postTemplate(content, createdAt));
}
