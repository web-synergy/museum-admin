export enum TypeEvent {
  EXHIBITION = 'Виставка',
  EXCURSION = 'Екскурсія',
  PRESENTATION = 'Презентація',
  CONTEST = 'Конкурс',
  LECTURE = 'Лекція',
  MASTER_CLASS = 'Майстер-клас',
  CREATIVE_EVENING = 'Творчій вечір',
  OTHER = 'Інше',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum FormEventFields {
  TITLE = 'title',
  TYPE = 'type',
  BEGIN = 'begin',
  END = 'end',
  SUMMARY = 'summary',
  DESCRIPTION = 'description',
  BANNER = 'banner',
}
