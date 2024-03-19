import styled, { css } from 'styled-components';

const selectStyles = css`
  top: 0;
  z-index: -1;
  width: 50%;
  content: '';
  height: 100%;
  display: block;
  position: absolute;
  background: rgba(var(--color-primary-rgb), 0.1);
`;

export const StyledCalendar = styled.div`
  .flatpickr-calendar {
    width: 280px;
    display: flex;
    row-gap: 16px;
    box-shadow: none;
    flex-direction: column;
  }

  .flatpickr-months {
    .flatpickr-month {
      .flatpickr-current-month {
        padding: 0;

        select,
        input {
          height: 2rem;
          font-size: 1rem;
          padding: 0.25rem;
          text-align: center;
          appearance: none;
        }
      }
    }

    .flatpickr-prev-month,
    .flatpickr-next-month {
      border: 1px solid #dfe4ed;
      border-radius: 8px;
      padding: 8px;

      svg {
        width: 16px;
        height: 16px;

        path {
          fill: var(--color-neutral-500);
        }
      }
    }
  }

  .flatpickr-weekday {
    color: var(--color-neutral-700);
  }

  .flatpickr-days {
    width: 100%;

    .dayContainer {
      width: 100%;
      display: grid;
      min-width: 100%;
      max-width: 100%;
      justify-content: center !important;
      grid-template-columns: repeat(7, 1fr);

      .flatpickr-day {
        font-weight: 500;
        width: 40px !important;
        height: 40px !important;
        border: none !important;
        margin-top: 4px !important;
        box-shadow: none !important;
        border-radius: 20px !important;

        &:focus,
        &:hover,
        &.inRange {
          &:not(.selected) {
            background: rgba(var(--color-primary-rgb), 0.1);
          }
        }

        &.inRange {
          border-radius: 0 !important;
        }

        &:nth-child(7n + 1) {
          &.inRange {
            border-radius: 20px 0 0 20px !important;
          }

          &::before {
            display: none !important;
          }
        }

        &:nth-child(7n) {
          &.inRange {
            border-radius: 0 20px 20px 0 !important;
          }

          &::after {
            display: none !important;
          }
        }

        &.selected,
        &.startRange,
        &.endRange {
          background: var(--color-primary) !important;
          position: relative;
        }

        &.selected,
        &:hover {
          &.startRange::after {
            ${selectStyles}
            right: 0;
          }

          &.endRange::before {
            ${selectStyles}
            left: 0;
          }

          &.startRange.endRange {
            &::before,
            &::after {
              display: none;
            }
          }
        }
      }
    }
  }
`;

export const RightArrow = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.47124 2.86195C8.21089 2.6016 7.78878 2.6016 7.52843 2.86195C7.26808 3.1223 7.26808 3.54441 7.52843 3.80476L11.057 7.33335H3.33317C2.96498 7.33335 2.6665 7.63183 2.6665 8.00002C2.6665 8.36821 2.96498 8.66669 3.33317 8.66669H11.057L7.52843 12.1953C7.26808 12.4556 7.26808 12.8777 7.52843 13.1381C7.78878 13.3984 8.21089 13.3984 8.47124 13.1381L13.1379 8.47142C13.3983 8.21108 13.3983 7.78896 13.1379 7.52862L8.47124 2.86195Z" fill="#667085"/>
</svg>
`;

export const LeftArrow = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.47124 3.80476C8.73159 3.54441 8.73159 3.1223 8.47124 2.86195C8.21089 2.6016 7.78878 2.6016 7.52843 2.86195L2.86177 7.52862C2.60142 7.78896 2.60142 8.21108 2.86177 8.47142L7.52843 13.1381C7.78878 13.3984 8.21089 13.3984 8.47124 13.1381C8.73159 12.8777 8.73159 12.4556 8.47124 12.1953L4.94265 8.66669L12.6665 8.66669C13.0347 8.66669 13.3332 8.36821 13.3332 8.00002C13.3332 7.63183 13.0347 7.33335 12.6665 7.33335L4.94265 7.33335L8.47124 3.80476Z" fill="#667085"/>
</svg>
`;
