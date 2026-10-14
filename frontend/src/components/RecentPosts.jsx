import PropTypes from 'prop-types'

function RecentPosts({ posts }) {
  return (
    <div className="recents">
      <h1 className="titlesection">Últimas publicações</h1>
      <div className="postsrecents">
        {posts.length === 0 && <p className="article">Nenhuma publicação ainda.</p>}
        {posts.slice(0, 5).map((post) => (
          <h2 className="article" key={post.id}>
            <a className="articleLink" href={`#post-${post.id}`}>
              {post.titulo}
            </a>
          </h2>
        ))}
      </div>
    </div>
  )
}

RecentPosts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titulo: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default RecentPosts
