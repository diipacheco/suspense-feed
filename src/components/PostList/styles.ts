import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleContainer = styled.div`
  margin-top: 65px;
  display: flex;

  > svg {
    margin-left: 14px;
  }
`;

export const List = styled.ul`
  width: 100%;
  max-width: 720px;

  list-style: none;

  display: flex;
  flex-direction: column;

  margin-top: 65px;

 > li {
    width: 100%;
    padding: 18px;

    background: rgba(0, 0, 0, 0.4);

    display: flex;
    flex-direction: column;

    border-radius: 10px;

    > article {
      margin-top: 15px;

      > h3 {
        color: #ccc;
      }

      > P {
        margin-top: 10px;
        line-height: 22px;
        font-size: 14px;
      }
    }
  }

  > li + li {
    margin-top: 25px;
  }

  hr {
    margin-top: 26px;
    opacity: 0.2;
  }
`;

export const CommentsContainer = styled.div`
  margin-top: 20px;

  button {
    background: none;
    color: #ccc;
    font-weight: bold;
    border: none;
    font-size: 14px;
    transition: 200ms;
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }
  } 
`;

interface CommentsContainerListProps {
  isDisplayed?: boolean
}

export const CommentsContainerList = styled.ul<CommentsContainerListProps>`
  margin-top: 15px;

  width: 100%;
  max-width: 320px;
  list-style: none;

  display: flex;
  flex-direction: column;

  > li + li {
    margin-top: 18px;
  }

  #comment-listItem {
    width: 100%;
    padding: 10px;
    border-radius: 28px;
    background: rgba(72, 84, 96, 0.2);

    > h4 {
      font-size: 14px;
    }

    > p {
      font-size: 12px;
      margin-top: 10px;
      line-height: 12px;
      color: #ccc;
    }
  }
`;
