import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { RegistrationResponse } from '@app/_models';

