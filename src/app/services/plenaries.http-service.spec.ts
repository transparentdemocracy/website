import {HttpClient, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";
import {PlenariesHttpService, Plenary} from "./plenaries.http-service";
import {environment} from "../../environments/environment";
import {Page} from "./pages";
import {ElasticSearch} from "./elastic";

describe('PlenariesHttpService', () => {
  let service: PlenariesHttpService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(PlenariesHttpService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('calls search plenaries endpoint and returns result', (done) => {
    service.getPlenaries(5, 'economie').subscribe(plenaries => {
      expect(plenaries).toEqual(PLENARIES_PAGE);
      done()
    })

    let testRequest = httpMock.expectOne(`${environment.searchPlenariesUrl}?q=economie&page=4`);
    testRequest.flush(PLENARIES_SEARCH_RESPONSE)
    httpMock.verify()
  })

})

const PLENARY_1 = {
  id: "55_123",
  title: "Test plenary",
  legislature: "55",
  date: "2024-11-15",
  pdfReportUrl: "http://pdf.url",
  htmlReportUrl: "http://html.url",
  motionGroups: []
};

const PLENARIES_SEARCH_RESPONSE: ElasticSearch<Plenary> = {
  hits: {
    total: {
      value: 51
    },
    hits: [
      {
        _source: PLENARY_1
      }
    ]
  }
}

const PLENARIES_PAGE: Page<Plenary> = {
  pageNr: 1, pageSize: 10, totalPages: 6, values: [
    PLENARY_1
  ]
};
