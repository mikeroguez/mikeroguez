---
title: 'Prediction is not intervention: validating academic indicators before using them'
seoTitle: 'Validating predictive models to support learning'
description: 'What we learned from validating a model of academic indicators, and why a signal in the data is not enough to turn it into an educational intervention.'
date: '2026-10-09'
status: 'published'
lang: 'en'
translationKey: 'prediction-is-not-intervention-validating-academic-indicators'
series: 'learning-analytics'
seriesOrder: '3'
tags: 'learning analytics, machine learning, artificial intelligence, higher education, research'
keywords: 'learning analytics, predictive models, machine learning, higher education, temporal validation, academic indicators'
---

An educational platform keeps many traces: submissions, activities, logins and
assessments. It is easy to look at that data and think that a system could
anticipate who needs support. But one question comes first: did that information
already exist when a decision would have had to be made?

That question is at the centre of our recent article,
[_Beyond Grades: Temporal Validation of a Multi-Output Model for Formative
Academic Indicators in a Latin American Public University_](https://doi.org/10.3390/app16199865),
published in _Applied Sciences_. The article does not present a tool ready to
send alerts. It examines what can be said when we use earlier course activity to
estimate what might happen later.

## An earlier version and a necessary revision

In July 2026, we shared an earlier version of this work as a
[preprint](https://doi.org/10.20944/preprints202607.0546.v1). A preprint makes
research public before peer review. It can help people follow a process, but it
is not the last word on the results.

The published article revisits the analysis with a stricter question: what
information was available before each point in a course, and which outcomes
happened later? For that reason, the final article is the source for the current
conclusions. The preprint remains a public record of an earlier stage, not
evidence that the model is ready to use.

## The problem with looking into the future

Many analyses happen after a course has ended. That makes it possible to gather
all available information and find patterns. The problem comes when those
patterns are later discussed as though they had been available during the course.

To support someone in time, a model should use only what was known then. A later
submission, a grade released later or an activity that had not yet happened
cannot become an early signal. If those things enter the analysis, the result can
look better than it would in a real situation.

For that reason, we organised the data around different points in academic
periods. We used activity before each point to estimate five later indicators:
assignment performance, missed assignments, late submissions, examination
performance and examination accuracy.

These are not diagnoses about people. They are observable indicators. They do
not directly measure motivation, dropout, self-regulation or “academic risk”.

## A good test also looks for limits

An average result can hide something important. A model may work in some courses
and not in others. It may also look good with familiar data and lose strength
when it is tested on a later academic period.

That is why we did not use only one test. We looked at groups from the same
course and period, courses the model had not seen and a later academic period. We
also compared the model with simple options. For example, to anticipate missed
assignments, we asked whether an earlier submission pattern already offered a
useful answer.

This comparison matters. A complex model is not better just because it uses more
data or produces a number. It needs to add something beyond a simple rule, and
it needs to remain useful outside the data used to create it.

## What we found

The clearest signal appeared for later missed assignments. Even so, it did not
hold in the same way across all courses. In the later period we evaluated, a rule
based on earlier submissions was more useful than the model.

For the other indicators, we did not find stable evidence for saying that they
could be estimated reliably in that setting. This is a smaller conclusion than
saying that a system “predicts performance.” But it is also more honest: it
shows which part of the evidence holds and which part does not.

This does not mean that educational data are useless or that models should be
abandoned. It means that finding a relationship in earlier data is not enough to
use a prediction in every course. It is certainly not enough to send an alert
that affects a student.

## An interface and a prediction are different questions

This also matters when prototypes are designed. An interface can help teachers
or students see information, understand a signal and talk about what to do.
Whether that interaction is clear, useful and respectful is a separate design
question.

But an easy-to-use interface does not make a prediction reliable. And a model
that seems to work well does not, by itself, show that an interface helps people
learn or make better decisions. Each needs its own evaluation.

The published article examines the predictive part with past data. It does not
evaluate an interface, an intervention, how people interpret alerts or their
educational effects. It therefore cannot show that a support tool works, but it
also cannot show that one cannot work. It makes clearer what still needs to be
shown.

## The value of a result with limits

In applied research, there is often pressure to find a more accurate model or a
final answer. But recognising a limit is also progress. It keeps a partial
signal from being presented as certainty and helps us ask better questions.

One question is whether simpler models, separated for each indicator, could offer
clearer results than a joint model. Another is how to show signals so that people
can discuss them, challenge them and use them with judgement.

Before something like this is used in an institution, there are still questions
about privacy, clear rules, tests with future periods and the support that can
actually be offered.

The main lesson is not that we should stop predicting. It is that prediction is
not intervention. Between a pattern in the data and a decision that affects a
person are many responsibilities: using information available in time, making
honest comparisons, interpreting it with people and knowing what support can be
provided.

That is where learning analytics can have real educational value.

## Further reading

This text draws on:

- Rodríguez-Ortiz, M. Á., Santana-Mancilla, P. C., & Anido-Rifón, L. E. (2026).
  _Beyond Grades: Temporal Validation of a Multi-Output Model for Formative
  Academic Indicators in a Latin American Public University_. _Applied
  Sciences, 16_(19), 9865. https://doi.org/10.3390/app16199865
