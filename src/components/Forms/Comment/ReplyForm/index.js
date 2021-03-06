import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SUBMIT_COMMENT_MUTATION = gql`
  mutation CreateNestedComment($link: ID!, $parent: ID!, $content: String!) {
    createComment(link: $link, parent: $parent, content: $content) {
      _id
    }
  }
`;

export default class CommentReplyForm extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    linkId: PropTypes.string.isRequired,
    parentComment: PropTypes.string.isRequired,
  };

  state = {
    comment: '',
  };

  render() {
    const { comment } = this.state;
    const { linkId, parentComment } = this.props;

    return (
      <div className="comment-form-wrapper">
        <Mutation
          mutation={SUBMIT_COMMENT_MUTATION}
          variables={{ link: linkId, parent: parentComment, content: comment }}
          // eslint-disable-next-line no-alert,no-undef
          onError={error => alert(error.toString().replace('Error: GraphQL error: ', ''))}
        >
          {mutate => (
            <form className="comment-reply-form" onSubmit={mutate}>
              <textarea
                placeholder="What are your thoughts?"
                onChange={e => this.setState({ comment: e.target.value })}
                value={comment}
              />
              <input className="comment-button" type="submit" value="Post Comment" />
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}
