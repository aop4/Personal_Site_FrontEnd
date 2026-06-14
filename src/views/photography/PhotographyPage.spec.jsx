import { expect, test, vi } from "vitest";
import PhotographyPage from "./PhotographyPage";

const mockPhoto = Object.freeze({
  server: 'mock-server',
  id: 'mock-id',
  secret: 'mock-secret',
  url_4k: 'https://live.staticflickr.com/srvr/id_scrt_4k.jpg',
  url_3k: 'https://live.staticflickr.com/srvr/id_scrt_3k.jpg',
  url_k: 'https://live.staticflickr.com/srvr/id_scrt_k.jpg',
  url_h: 'https://live.staticflickr.com/srvr/id_scrt_h.jpg'
});

test.each([
  { 
    photo: mockPhoto,
    expectedUrl: mockPhoto.url_4k
  },
  { 
    photo: mockPhotoWithout('url_4k'),
    expectedUrl: mockPhoto.url_3k
  },
  { 
    photo: mockPhotoWithout('url_4k', 'url_3k'),
    expectedUrl: mockPhoto.url_k
  },
  { 
    photo: mockPhotoWithout('url_4k', 'url_3k', 'url_k'),
    expectedUrl: mockPhoto.url_h
  },
  { 
    photo: mockPhotoWithout('url_4k', 'url_3k', 'url_k', 'url_h'),
    expectedUrl: 'https://live.staticflickr.com/mock-server/mock-id_mock-secret_b.jpg'
  }
])('getPhotoUrl should choose highest-resolution URL available on large screen ($expectedUrl)', ({photo, expectedUrl}) => {
  vi.stubGlobal('window', {
    screen: {
      width: 3840
    }
  });
  let page = new PhotographyPage();

  let photoUrl = page.getPhotoUrl(photo);

  expect(photoUrl).toEqual(expectedUrl);
});


test.each([
  { 
    photo: mockPhoto,
    expectedUrl: mockPhoto.url_k
  },
  { 
    photo: mockPhotoWithout('url_k'),
    expectedUrl: mockPhoto.url_h
  },
  { 
    photo: mockPhotoWithout('url_k', 'url_h'),
    expectedUrl: 'https://live.staticflickr.com/mock-server/mock-id_mock-secret_b.jpg'
  }
])('getPhotoUrl should choose highest-resolution URL allowed for a small screen ($expectedUrl)', ({photo, expectedUrl}) => {
  vi.stubGlobal('window', {
    screen: {
      width: 375
    }
  });
  let page = new PhotographyPage();

  let photoUrl = page.getPhotoUrl(photo);

  expect(photoUrl).toEqual(expectedUrl);
});

function mockPhotoWithout(...fields) {
  let photo = structuredClone(mockPhoto);
  fields.forEach(field => {
    delete photo[field];
  });
  return photo;
}
