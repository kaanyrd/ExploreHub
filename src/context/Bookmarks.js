import { createContext, useState } from "react";

const BookmarksContext = createContext();

export const BookmarksContextProvider = ({ children }) => {
  const localBookmarks = localStorage.getItem("bookmarks");
  const localBookmarksData = JSON.parse(localBookmarks);

  const [bookmarks, setBookmarks] = useState(localBookmarksData || []);

  const bookmarksHandler = {
    bookmarks,
    setBookmarks,
  };

  const localData = JSON.stringify(bookmarks);

  localStorage.setItem("bookmarks", localData);

  return (
    <BookmarksContext.Provider value={bookmarksHandler}>
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksContext;
